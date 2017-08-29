/* @flow */
import { defaultConfig } from "./config";
import type { Config, State } from "./types";

/**
 * Reducer used to support the `memoize` decorator below
 */
const createReducer = (
  { invalidate, initMatcher, successMatcher, failureMatcher }: Config = defaultConfig,
) => {
  const _setStatus = (state, action, status) => {
    const { meta: { memoKey, memoSubKey, multipleCaches } } = action;

    if (multipleCaches) {
      // *merge* status with existing status if `multipleCaches` option is *true*
      return {
        ...state,
        [memoKey]: {
          ...state[memoKey],
          [memoSubKey]: status,
        },
      };
    }
    // *overwrite* status with existing status if `multipleCaches` option is *false*
    return {
      ...state,
      [memoKey]: {
        [memoSubKey]: status,
      },
    };
  };

  const reducer = (state: State = {}, action: Object) => {
    const { type, meta: { memoKey } = {} } = action;

    if (invalidate(state, action)) {
      return {};
    }

    // If it is not a memoized action, do nothing
    if (!memoKey) {
      return state;
    }

    // Update the apiMemoization state if it is loading, failed, or succeeded
    if (initMatcher(action)) {
      return _setStatus(state, action, "loading");
    } else if (failureMatcher(action)) {
      return _setStatus(state, action, "error");
    } else if (successMatcher(action)) {
      return _setStatus(state, action, "success");
    }
    return state;
  };

  return reducer;
};

export default createReducer;
