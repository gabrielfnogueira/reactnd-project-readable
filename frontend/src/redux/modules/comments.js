import { omit } from 'lodash';
import { fetchComments } from '../../utils/api';

/**
 * ACTION TYPES
 */
const ADD_COMMENT = 'posts/ADD_COMMENT';
const UPDATE_COMMENT = 'posts/UPDATE_COMMENT';
const DELETE_COMMENT = 'posts/DELETE_COMMENT';

const INITIAL_STATE = {};

/**
 * REDUCER
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {
          ...state[action.payload.parentId],
          [action.payload.id]: action.payload
        }
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {
          ...state[action.payload.parentId],
          [action.payload.id]: action.payload
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: omit(state[action.payload.parentId], action.payload.id)
      };
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export function getCommentsByPost(postId) {
  return dispatch => {
    fetchComments(postId, {
      success: comments => {
        comments.forEach(comment => dispatch({ type: ADD_COMMENT, payload: comment }));
      }
    });
  };
}
