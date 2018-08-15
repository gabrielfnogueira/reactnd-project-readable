import { omit } from 'lodash';
import {
  createComment as postComment,
  deleteComment,
  fetchPostComments,
  postCommentVote,
  updateComment as putComment
} from '../../utils/api';
import { uuidv4 } from '../../utils/helpers';

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

export function saveCommentVote(commentId, voteOption) {
  return dispatch => {
    postCommentVote(commentId, voteOption, {
      success: comment => {
        dispatch({ type: ADD_COMMENT, payload: comment });
      }
    });
  };
}

export function createComment(comment, postId, callback) {
  return dispatch => {
    const newComment = { ...comment, id: uuidv4(), timestamp: new Date().getTime(), parentId: postId };
    postComment(newComment, {
      success: comment => {
        dispatch({ type: ADD_COMMENT, payload: { ...newComment, ...comment } });

        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  };
}

export function updateComment(comment, callback) {
  return dispatch => {
    putComment(comment, {
      success: comment => {
        dispatch({ type: ADD_COMMENT, payload: comment });

        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  };
}

export function removeComment(commentId) {
  return dispatch => {
    deleteComment(commentId, {
      success: comment => {
        dispatch({ type: DELETE_COMMENT, payload: comment });
      }
    });
  };
}
