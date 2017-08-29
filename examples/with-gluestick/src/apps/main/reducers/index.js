/* @flow */
import { createMemoReducer } from "redux-promise-memo";

// Important: the Redux slice must be named `_memo` because `memoize` looks for it there.
const _memo = createMemoReducer();
const count1 = (state = 0, action) => (action.type === "FETCH_SOMETHING1" ? state + 1 : state);
const count2 = (state = 0, action) => (action.type === "FETCH_SOMETHING2" ? state + 1 : state);
const knicks = (state = []) => state;
const knacks = (state = {}) => state;

export default {
  _memo,
  count1,
  count2,
  knicks,
  knacks
};
