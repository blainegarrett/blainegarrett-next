// Redux Assist Tools
import isEqual from 'lodash.isequal';
import { createSelectorCreator, defaultMemoize } from 'reselect';

// Async Action Suffixes
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createAsyncActionTypes(base) {
  // Helper to create Actions for async operations for easy access
  // returns an object with props like {REQUEST: 'REQUEST', SUCCESS: 'SUCCESS', FAILURE: 'FAILURE'}
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function actionFactory(type, payload = {}) {
  // Helper to construct a redux action
  return { type, ...payload };
}

export function asyncCallMapper(actionGroup) {
  // Helper to map return arguments from async calls to hydrated actions to be handled by pagination, etc
  // actionGroup is a object created by createRequestTypes
  return {
    actionGroup, // for debugging purposes
    request: async_args =>
      actionFactory(actionGroup[REQUEST], { ...async_args }),
    success: (response, async_args) =>
      actionFactory(actionGroup[SUCCESS], { response, ...async_args }),
    failure: (error, async_args) =>
      actionFactory(actionGroup[FAILURE], { error, ...async_args })
  };
}

// Non-Saga version
export function asyncFetch(dispatch, asyncActionMap, apiFunction, ...args) {
  // Type Check args
  if (!apiFunction || typeof apiFunction !== 'function') {
    throw new Error('api function is undefined or not of type function.');
  }

  dispatch(asyncActionMap.request(...args));

  // Call API function
  return apiFunction(...args)
    .then(response => {
      dispatch(asyncActionMap.success(response.response, ...args));
    })
    .catch(error => {
      console.log('FAIL!?!?!??!??!');
      dispatch(asyncActionMap.failure(error, ...args));
      //return asyncActionMap.failure(error, ...args);
    });
}

export function resourceIndex(state = {}, action) {
  // A reducer to map resource_ids to resources so we have a single state for them
  // If you are using the apiClient to query, it stuffs the json body into action.result with the key of results being the response data

  // duck type a async action success
  if (
    action.type &&
    action.type.indexOf(SUCCESS) !== -1 &&
    action.response &&
    action.response.results
  ) {
    // This is likely a async response
    var resources = action.response.results;
    if (!Array.isArray(resources)) {
      resources = [resources];
    }

    let new_resources = {};
    resources.forEach(function(resource) {
      if (resource.resource_id) {
        // Ensure we do not overwrite verbose when not verbose
        if (
          !(
            state[resource.resource_id] && // existing resource
            state[resource.resource_id]._meta &&
            state[resource.resource_id]._meta.is_verbose
          ) // existing is verbose
        ) {
          // Update resource store
          new_resources[resource.resource_id] = resource;
        }
        return;
      }

      console.debug(
        'Resource did not have resource_id property. Is verbose=true?'
      );
    });

    return Object.assign({}, state, new_resources);
  }

  return state;
}

export function getResourcesFromState(resource_ids, state) {
  return resource_ids.map(resource_id => state.resourceIndex[resource_id]);
}

// create a "selector creator" that uses lodash.isEqual instead of ===
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const selectResoureById = (state, resource_id) => {
  return { resource: state.resourceIndex[resource_id], resource_id };
};
export const selectResourceIndex = state => state.resourceIndex;

export const selectPaginationState = (
  state,
  sourceStoreName,
  paginationKey
) => {
  let resource_ids = [];
  let more, nextCursor;

  let paginator = state[sourceStoreName].paginated[paginationKey];
  if (paginator) {
    resource_ids = paginator.ids;
    more = paginator.more;
    nextCursor = paginator.cursor;
  }

  // Vars sourceStoreName, paginationKey are used for debugging
  return { resource_ids, more, nextCursor, sourceStoreName, paginationKey };
};

export const makeSelectPagedResources = () => {
  // This creates a new instance of the selector with each call
  // This allows args to be passed without memoization conflicts

  return createDeepEqualSelector(
    //createSelector(
    [selectPaginationState, selectResourceIndex],
    (
      { resource_ids, more, nextCursor, sourceStoreName, paginationKey },
      resourceIndex
    ) => {
      // Uncomment to debug selectors
      //console.log('Debug: makeSelectPagedResources called for store: ' + sourceStoreName + '.pagination[' + paginationKey + '] with nextCursor: ' + nextCursor);
      let resources = resource_ids.map(
        resource_id => resourceIndex[resource_id]
      );
      return { resources, more, nextCursor };
    }
  );
};

export const makeSelectResourceById = () => {
  // This creates a new instance of the selector with each call
  // This allows args to be passed without memoization conflicts

  return createDeepEqualSelector(
    //createSelector(
    [selectResoureById],
    ({ resource, resource_id }) => {
      // Uncomment to debug selectors
      //console.log('Debug: makeSelectResourceById called for id: ' + resource_id);
      return resource;
    }
  );
};
