"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultConfig = exports.defaultConfig = {
  invalidate: function invalidate(state, action) {
    return false;
  },
  initMatcher: function initMatcher(action) {
    return action.type.endsWith("_INIT");
  },
  failureMatcher: function failureMatcher(action) {
    return action.type.endsWith("_FAILURE");
  },
  successMatcher: function successMatcher(action) {
    return !action.type.endsWith("_INIT") && !action.type.endsWith("_FAILURE");
  }
};
var reduxPromiseMiddlewareConfig = exports.reduxPromiseMiddlewareConfig = {
  invalidate: function invalidate(state, action) {
    return false;
  },
  initMatcher: function initMatcher(action) {
    return action.type.endsWith("_PENDING");
  },
  failureMatcher: function failureMatcher(action) {
    return action.type.endsWith("_REJECTED");
  },
  successMatcher: function successMatcher(action) {
    return action.type.endsWith("_FULFILLED");
  }
};