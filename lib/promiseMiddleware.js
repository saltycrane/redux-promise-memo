"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * This promise middleware was copied from GlueStick.
 * https://github.com/TrueCar/gluestick/blob/v1.13.7/packages/gluestick/shared/lib/promiseMiddleware.js
 */
var promiseMiddleware = function promiseMiddleware(store) {
  return function (next) {
    return function (action) {
      var type = action.type,
          promise = action.promise,
          rest = _objectWithoutProperties(action, ["type", "promise"]);

      if (!promise) {
        return next(action);
      }

      next(_extends({}, rest, { type: type + "_INIT" }));

      return promise.then(function (response) {
        next(_extends({}, rest, { type: type, payload: response }));
        return response;
      }, function (error) {
        next(_extends({}, rest, { type: type + "_FAILURE", error: error }));
        return false;
      });
    };
  };
};

exports.default = promiseMiddleware;