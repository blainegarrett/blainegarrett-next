// All things Redux for the Blog Module
import { combineReducers } from 'redux';
import {
  asyncFetch,
  asyncCallMapper,
  createAsyncActionTypes,
  createDeepEqualSelector,
  makeSelectPagedResources,
  selectResourceIndex,
} from '../../redux-assist';

import paginate from '../../redux-assist/paginate';
import { fetchArticles, fetchArticleBySlug } from '../../services/apiClient';
import { createSelector } from 'reselect';

/***********************************
    Section 1: Constants
************************************/
const REDUCER_NAMESPACE = 'articlesStore';

/***********************************
    Section 2: Redux Actions
************************************/
// Section 2.1 Synchronous Actions
// Section 2.2 Async Actions
const LOAD_ARTICLES = createAsyncActionTypes('LOAD_ARTICLES');
const LOAD_ARTICLE = createAsyncActionTypes('LOAD_ARTICLE');

// CATEGORIES????
// const CATEGORY_ITEMS = createAsyncActionTypes('CATEGORY_ITEMS');

/***********************************
 Section 3: Reducers
************************************/
const paginated = paginate({
  mapActionToKey: action => action.paginationKey,
  types: [LOAD_ARTICLES.REQUEST, LOAD_ARTICLES.SUCCESS, LOAD_ARTICLES.FAILURE],
});

function articleSlugIndex(state = {}, action) {
  // Index of article slugs to resource_ids

  switch (action.type) {
    case LOAD_ARTICLES.SUCCESS: {
      // This fires in addition to pagination so these are cached...
      const results = action.response.results;
      const newResources = state;
      results.forEach(r => {
        newResources[r.slug] = r.resource_id;
      });

      return Object.assign({}, state, newResources);
    }
    case LOAD_ARTICLE.SUCCESS: {
      // TODO: Account for the big list as well...
      // single article
      const results = action.response.results;
      const newResources = {};
      newResources[results.slug] = results.resource_id;

      return Object.assign({}, state, newResources);
    }
    default: {
      return state;
    }
  }
}

// TODO: Category Slug Index?

/***********************************
 Section 4: Selectors
************************************/

// const selectCategoryBySlug = (state, slug) => state[REDUCER_NAMESPACE].categorySlugIndex[slug];
// const makeSelectCategoryResourceBySlug = () => {
//   return createDeepEqualSelector(
//     [selectCategoryBySlug, selectResourceIndex],
//     (resource_id, resourceIndex) => {
//       return resourceIndex[resource_id];
//     }
//   );
// };

const selectArticleBySlug = (state, slug) => {
  return state[REDUCER_NAMESPACE].articleSlugIndex[slug];
};

/**
 * Create a selector to select article by article slug from resource index
 */
const makeSelectArticleResourceBySlug = () => {
  return createDeepEqualSelector([selectArticleBySlug, selectResourceIndex], (resource_id, resourceIndex) => {
    return resourceIndex[resource_id];
  });
};

const selectStuff = createSelector(makeSelectPagedResources(), ({ ...state }) => {
  return state;
});

/***********************************
 Section 5: Commands
************************************/

// function loadArticleBySlug(slug, state) {
//   // Select from the state so as not to reload the data if we already have it
//   let params = {get_by_slug: slug, verbose:true};
//   let endpoint = '/api/posts';

//   // build query string
//   const baseUrl = API_DOMAIN + endpoint;
//   const fullUrl = baseUrl + makeQueryString(params);

//   return {
//     types: [ ARTICLE_RESOURCE.REQUEST, ARTICLE_RESOURCE.SUCCESS, ARTICLE_RESOURCE.FAILURE ],
//     promise: (client) => {
//       return client.get(fullUrl);
//     }
//   };
// }

function loadArticles(params, nextCursor, paginationKey) {
  return dispatch => {
    return asyncFetch(dispatch, asyncCallMapper(LOAD_ARTICLES), fetchArticles, {
      params,
      nextCursor,
      paginationKey,
    });
  };
}

function loadArticleBySlug(slug) {
  return dispatch => {
    return asyncFetch(dispatch, asyncCallMapper(LOAD_ARTICLE), fetchArticleBySlug, { slug });
  };
}

/***********************************
Section 6: Sagas
************************************/
// Not currently using sagas

/***********************************
Section 7: Subroutines
************************************/
// Not Currently using sagas

/***********************************
Section 8: Prep exports
************************************/
const constants = { REDUCER_NAMESPACE };
const actions = {};

const reducers = combineReducers({
  articleSlugIndex,
  //categorySlugIndex,
  paginated,
});

const selectors = {
  makeSelectArticleResourceBySlug, // for article
  makeSelectPagedResources, // for lists of articles
  //selectSlugInStore,
  //makeSelectResourceById, // for author
  //makeSelectCategoryResourceBySlug // for category,
  selectStuff,
};

const commands = {
  loadArticleBySlug,
  loadArticles,
  //loadCategories,
  //loadAuthors
};

const sagas = [];

/***********************************
Section 9: Exports
************************************/
// import { sagas as venueSagas } from '../modules/venues/redux';
export { constants, actions, reducers, selectors, commands, sagas };
