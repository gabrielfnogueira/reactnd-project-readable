/**
 * ACTION TYPES
 */
const SET_ORDER_BY = 'orderBy/SET_ORDER_BY';

const INITIAL_STATE = 'timestamp';

/**
 * REDUCER
 */

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ORDER_BY:
      return action.payload;
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export function setOrderBy(orderBy) {
  return { type: SET_ORDER_BY, payload: orderBy };
}
