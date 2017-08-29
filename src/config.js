/* @flow */
import type { State } from "./types";

export const defaultConfig = {
  invalidate: (state: State, action: Object) => false,
  initMatcher: (action: Object) => action.type.endsWith("_INIT"),
  failureMatcher: (action: Object) => action.type.endsWith("_FAILURE"),
  successMatcher: (action: Object) =>
    !action.type.endsWith("_INIT") && !action.type.endsWith("_FAILURE"),
};

export const reduxPromiseMiddlewareConfig = {
  invalidate: (state: State, action: Object) => false,
  initMatcher: (action: Object) => action.type.endsWith("_PENDING"),
  failureMatcher: (action: Object) => action.type.endsWith("_REJECTED"),
  successMatcher: (action: Object) => action.type.endsWith("_FULFILLED"),
};
