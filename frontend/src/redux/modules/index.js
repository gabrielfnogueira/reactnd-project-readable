import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import orderByReducer from './orderBy';
import postsReducer from './posts';

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  orderBy: orderByReducer
});
