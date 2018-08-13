import { omit } from 'lodash';
import { createSelector } from 'reselect';
import { fetchPosts, fetchPostsByCategory } from '../../utils/api';

/**
 * ACTION TYPES
 */
const ADD_POST = 'posts/ADD_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const DELETE_POST = 'posts/DELETE_POST';

const INITIAL_STATE = {};

/**
 * REDUCER
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case UPDATE_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_POST:
      return omit(state, action.payload.id);
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export function getPosts() {
  return dispatch => {
    fetchPosts({
      success: posts => {
        posts.forEach(post => dispatch({ type: ADD_POST, payload: post }));
      }
    });
  };
}

export function getPostsByCategory(category) {
  return dispatch => {
    fetchPostsByCategory(category, {
      success: posts => {
        posts.forEach(post => dispatch({ type: ADD_POST, payload: post }));
      }
    });
  };
}

/**
 * SELECTORS
 */
export const postsSelector = createSelector(
  state => state.posts,
  state => state.orderBy,
  (state, props) => props.selectedCategory,
  (posts, orderBy, selectedCategory) => {
    return selectedCategory
      ? Object.keys(posts)
          .filter(postId => posts[postId].category === selectedCategory)
          .map(postId => posts[postId])
          .sort((a, b) => b[orderBy] - a[orderBy])
      : Object.keys(posts).map(postId => posts[postId]);
  }
);
