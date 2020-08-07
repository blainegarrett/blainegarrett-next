// Core Redux Store
// Add your reducers to the ./rootReducer
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

export function initializeStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}
