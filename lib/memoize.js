"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Return a "memoized" version of a promise action creator.
 */
var memoize = function memoize(actionCreator, memoKey) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // `returnVal` is used to store the promise returned by dispatching the action so
  // it can be returned if loading or cached. See Note 2 in the docstring above.
  var returnVal = {};
  var _options$multipleCach = options.multipleCaches,
      multipleCaches = _options$multipleCach === undefined ? false : _options$multipleCach;


  var newActionCreator = function newActionCreator() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (dispatch, getState) {
      var isDev = process.env.NODE_ENV !== "production";
      var state = getState();
      var memoSubKey = JSON.stringify(args);

      // initialize the return value if it doesn't exist
      if (!returnVal.hasOwnProperty(memoSubKey)) {
        returnVal[memoSubKey] = Promise.resolve();
      }

      // read the status from the Redux state for the given memoization key
      var _state$_memo$memoKey = state._memo[memoKey];
      _state$_memo$memoKey = _state$_memo$memoKey === undefined ? {} : _state$_memo$memoKey;
      var status = _state$_memo$memoKey[memoSubKey];


      if (status === "loading") {
        isDev && console.log("[loading] " + memoKey, memoSubKey); // eslint-disable-line
        return returnVal[memoSubKey];
      } else if (status === "success") {
        isDev && console.log("[cached] " + memoKey, memoSubKey); // eslint-disable-line
        // the returned promise should be used for timing purposes only.
        // replace the original promise with `Promise.resolve()` to free up memory.
        returnVal[memoSubKey] = Promise.resolve();
        return returnVal[memoSubKey];
      } else if (status === "error") {
        // dispatch if there was an error
        isDev && console.log("[error, requesting] " + memoKey, memoSubKey); // eslint-disable-line
      } else {
        // dispatch if it is the first request or arguments changed
        isDev && console.log("[requesting] " + memoKey, memoSubKey); // eslint-disable-line
      }

      // add `memoSubKey` to the original action, dispatch the action, and store the promise in
      // `returnVal` to return in "cached" or "loading" scenarios.
      var action = actionCreator.apply(undefined, args);

      // support returning null from action creator to do nothing
      if (!action) {
        // $FlowFixMe
        return Promise.resolve();
      }

      returnVal[memoSubKey] = dispatch(_extends({}, action, {
        meta: _extends({}, action.meta, {
          memoKey: memoKey,
          memoSubKey: memoSubKey,
          multipleCaches: multipleCaches
        })
      }));

      return returnVal[memoSubKey];
    };
  };
  return newActionCreator;
};
exports.default = memoize;