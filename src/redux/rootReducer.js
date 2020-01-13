// Root Reducer
// Import and add your reducers here
import { combineReducers } from 'redux';
import { resourceIndex } from '../redux-assist';
import {
  reducers as articlesReducers,
  constants as articleConstants
} from '../modules/articles/redux';

export default combineReducers({
  resourceIndex,
  [articleConstants.REDUCER_NAMESPACE]: articlesReducers
});
