// All things Redux for the Blog Module
import { combineReducers } from 'redux';
import {
  createAsyncActionTypes,
  asyncFetch,
  asyncCallMapper,
  createDeepEqualSelector,
  selectResourceIndex
} from '../../redux-assist';
import paginate from '../../redux-assist/paginate';
import { fetchArticles, fetchArticleBySlug } from '../../services/apiClient';
import { makeSelectPagedResources } from '../../redux-assist';

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

/***********************************
 Section 3: Reducers
************************************/
const paginated = paginate({
  mapActionToKey: action => action.paginationKey,
  types: [LOAD_ARTICLES.REQUEST, LOAD_ARTICLES.SUCCESS, LOAD_ARTICLES.FAILURE]
});

function articleSlugIndex(state = {}, action) {
  // Index of article slugs to resource_ids
  switch (action.type) {
    case LOAD_ARTICLE.SUCCESS: {
      // TODO: Account for the big list as well...
      // single article
      let results = action.response.results;
      let new_resources = {};
      new_resources[results.slug] = results.resource_id;

      return Object.assign({}, state, new_resources);
    }
    default: {
      return state;
    }
  }
}

/***********************************
 Section 4: Selectors
************************************/
const selectArticleBySlug = (state, slug) =>
  state[REDUCER_NAMESPACE].articleSlugIndex[slug];

const makeSelectArticleResourceBySlug = () => {
  return createDeepEqualSelector(
    [selectArticleBySlug, selectResourceIndex],
    (resource_id, resourceIndex) => {
      return resourceIndex[resource_id];
    }
  );
};

/***********************************
 Section 5: Commands
************************************/
function loadArticles(params, cursor, paginationKey) {
  return dispatch => {
    return asyncFetch(dispatch, asyncCallMapper(LOAD_ARTICLES), fetchArticles, {
      params,
      nextCursor: cursor,
      paginationKey
    });
  };
}

function loadArticleBySlug(slug) {
  return dispatch => {
    return asyncFetch(
      dispatch,
      asyncCallMapper(LOAD_ARTICLE),
      fetchArticleBySlug,
      { slug }
    );
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
  paginated
});

const selectors = {
  makeSelectArticleResourceBySlug, // for article
  makeSelectPagedResources // for lists of articles
  //selectSlugInStore,
  //makeSelectResourceById, // for author
  //makeSelectCategoryResourceBySlug // for category
};

const commands = {
  loadArticleBySlug,
  loadArticles
  //loadCategories,
  //loadAuthors
};

const sagas = [];

/***********************************
Section 9: Exports
************************************/
// import { sagas as venueSagas } from '../modules/venues/redux';
export { constants, actions, reducers, selectors, commands, sagas };
