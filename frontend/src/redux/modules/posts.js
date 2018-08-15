import { omit } from 'lodash';
import { createSelector } from 'reselect';
import {
  createPost as postPost,
  deletePost,
  fetchPostById,
  fetchPosts,
  fetchPostsByCategory,
  postVote,
  updatePost as putPost
} from '../../utils/api';
import { uuidv4 } from '../../utils/helpers';

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

export function getPostById(postId) {
  return dispatch => {
    fetchPostById(postId, {
      success: post => {
        dispatch({ type: ADD_POST, payload: post });
      }
    });
  };
}

export function createPost(post, callback) {
  return dispatch => {
    const newPost = { ...post, id: uuidv4(), timestamp: new Date().getTime() };
    postPost(newPost, {
      success: post => {
        dispatch({ type: ADD_POST, payload: { ...newPost, ...post } });

        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  };
}

export function updatePost(post, callback) {
  return dispatch => {
    putPost(post, {
      success: post => {
        dispatch({ type: ADD_POST, payload: post });

        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  };
}

export function removePost(postId) {
  return dispatch => {
    deletePost(postId, {
      success: post => {
        dispatch({ type: DELETE_POST, payload: post });
      }
    });
  };
}

export function savePostVote(postId, voteOption) {
  return dispatch => {
    postVote(postId, voteOption, {
      success: post => {
        dispatch({ type: ADD_POST, payload: post });
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
          .sort((a, b) => posts[b][orderBy] - posts[a][orderBy])
      : Object.keys(posts).sort((a, b) => posts[b][orderBy] - posts[a][orderBy]);
  }
);
