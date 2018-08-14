import { omit } from 'lodash';
import { fetchPostComments } from '../../utils/api';

/**
 * ACTION TYPES
 */
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

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
export function getPostComments(postId) {
  return dispatch => {
    fetchPostComments(postId, {
      success: comments => {
        comments.forEach(comment => dispatch({ type: ADD_COMMENT, payload: comment }));
      }
    });
  };
}
