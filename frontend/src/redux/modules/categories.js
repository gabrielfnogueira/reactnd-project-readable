import { fetchCategories } from '../../utils/api';

/**
 * ACTION TYPES
 */
const SET_CATEGORIES = 'categories/SET_CATEGORIES';

const INITIAL_STATE = [];

/**
 * REDUCER
 */ export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export function getCategories() {
  return dispatch => {
    fetchCategories({
      success: categories => {
        dispatch({ type: SET_CATEGORIES, payload: categories });
      }
    });
  };
}
