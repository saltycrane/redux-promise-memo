import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { defaultConfig } from "./config";
import createReducer from "./createReducer";
import promiseMiddleware from "./promiseMiddleware";
import type { Config } from "./types";

/**
 * NOTE: this does not seem to work with other middleware. Not sure what I'm doing wrong.
 */
const enhancer = (config: Config = defaultConfig) => (
  createStore: Function,
) => {
  return function newCreateStore(
    reducer: Function,
    preloadedState: any,
    enhancer: Function,
  ) {
    const memoReducer = createReducer(config);

    function newReducer(state = {}, action) {
      const { _memo, ...appState } = state;
      return {
        _memo: memoReducer(_memo, action),
        ...reducer(appState, action),
      };
    }

    const middleware = config.useMiddleware
      ? [thunk, promiseMiddleware]
      : [thunk];
    const newEnhancer = enhancer
      ? compose(
          enhancer,
          applyMiddleware(...middleware),
        )
      : applyMiddleware(...middleware);

    return createStore(newReducer, preloadedState, newEnhancer);
  };
};

export default enhancer;
