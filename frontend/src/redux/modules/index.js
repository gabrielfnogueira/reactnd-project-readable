import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import commentsReducer from './comments';
import orderByReducer from './orderBy';
import postsReducer from './posts';

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  orderBy: orderByReducer
});
