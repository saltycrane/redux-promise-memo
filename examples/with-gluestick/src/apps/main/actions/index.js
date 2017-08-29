/* @flow */
import { memoize } from "redux-promise-memo";

/**
 * Fake fetch function that returns a promise
 */
const fakeFetch = (url) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

/**
 * Action creators
 */
export const fetchSomething1 = id => ({
  type: "FETCH_SOMETHING1",
  promise: fakeFetch("/my/fake/url/1"),
});

const _fetchSomething2 = id => ({
  type: "FETCH_SOMETHING2",
  promise: fakeFetch("/my/fake/url/2"),
});
export const memoizedFetchSomething2 = memoize(_fetchSomething2, "FETCH_SOMETHING2");
