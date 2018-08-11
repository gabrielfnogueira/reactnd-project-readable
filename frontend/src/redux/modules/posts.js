import { omit } from 'lodash';
import { fetchPosts } from '../../utils/api';

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
