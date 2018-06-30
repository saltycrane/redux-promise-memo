/* @flow */
import type { MemoizeOptions } from "./types";

/**
 * Return a "memoized" version of a promise action creator.
 */
const memoize = (
  actionCreator: Function,
  memoKey: string,
  options: MemoizeOptions = {},
) => {
  // `returnVal` is used to store the promise returned by dispatching the action so
  // it can be returned if loading or cached. See Note 2 in the docstring above.
  const returnVal = {};
  const { multipleCaches = false } = options;

  const newActionCreator = (...args: Array<*>) => (
    dispatch: Function,
    getState: Function,
  ) => {
    const isDev = process.env.NODE_ENV !== "production";
    const state = getState();
    const memoSubKey = JSON.stringify(args);

    // initialize the return value if it doesn't exist
    if (!returnVal.hasOwnProperty(memoSubKey)) {
      returnVal[memoSubKey] = Promise.resolve();
    }

    // read the status from the Redux state for the given memoization key
    const { [memoKey]: { [memoSubKey]: status } = {} } = state._memo;

    if (status === "loading") {
      isDev && console.log(`[loading] ${memoKey}`, memoSubKey); // eslint-disable-line
      return returnVal[memoSubKey];
    } else if (status === "success") {
      isDev && console.log(`[cached] ${memoKey}`, memoSubKey); // eslint-disable-line
      // the returned promise should be used for timing purposes only.
      // replace the original promise with `Promise.resolve()` to free up memory.
      returnVal[memoSubKey] = Promise.resolve();
      return returnVal[memoSubKey];
    } else if (status === "error") {
      // dispatch if there was an error
      isDev && console.log(`[error, requesting] ${memoKey}`, memoSubKey); // eslint-disable-line
    } else {
      // dispatch if it is the first request or arguments changed
      isDev && console.log(`[requesting] ${memoKey}`, memoSubKey); // eslint-disable-line
    }

    // add `memoSubKey` to the original action, dispatch the action, and store the promise in
    // `returnVal` to return in "cached" or "loading" scenarios.
    const action = actionCreator(...args);

    // thunk action creators are not supported so throw an error
    if (typeof action === "function") {
      throw new Error(
        `thunk action creators cannot be used with redux-promise-memo. ${
          actionCreator.name
        } should return an object instead of a function.`,
      );
    }

    // support returning null from action creator to do nothing
    if (!action) {
      return Promise.resolve();
    }

    returnVal[memoSubKey] = dispatch({
      ...action,
      meta: {
        ...action.meta,
        memoKey,
        memoSubKey,
        multipleCaches,
      },
    });

    return returnVal[memoSubKey];
  };
  return newActionCreator;
};

export default memoize;
