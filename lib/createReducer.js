"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require("./config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Reducer used to support the `memoize` decorator below
 */
var createReducer = function createReducer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.defaultConfig,
      invalidate = _ref.invalidate,
      initMatcher = _ref.initMatcher,
      successMatcher = _ref.successMatcher,
      failureMatcher = _ref.failureMatcher;

  var _setStatus = function _setStatus(state, action, status) {
    var _action$meta = action.meta,
        memoKey = _action$meta.memoKey,
        memoSubKey = _action$meta.memoSubKey,
        multipleCaches = _action$meta.multipleCaches;


    if (multipleCaches) {
      // *merge* status with existing status if `multipleCaches` option is *true*
      return _extends({}, state, _defineProperty({}, memoKey, _extends({}, state[memoKey], _defineProperty({}, memoSubKey, status))));
    }
    // *overwrite* status with existing status if `multipleCaches` option is *false*
    return _extends({}, state, _defineProperty({}, memoKey, _defineProperty({}, memoSubKey, status)));
  };

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var type = action.type,
        _action$meta2 = action.meta;
    _action$meta2 = _action$meta2 === undefined ? {} : _action$meta2;
    var memoKey = _action$meta2.memoKey;


    var keysToInvalidate = invalidate(action);
    if (keysToInvalidate) {
      // if `invalidate` returns an array, it is an array of keys to remove so remove those keys
      if (Array.isArray(keysToInvalidate)) {
        return Object.keys(state).reduce(function (memo, key) {
          if (!keysToInvalidate.includes(key)) {
            memo[key] = state[key];
          }
          return memo;
        }, {});
      }
      // if it is not an array (and it is true), clear all the keys
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

exports.default = createReducer;