"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _config = require("./config");

var _createReducer = require("./createReducer");

var _createReducer2 = _interopRequireDefault(_createReducer);

var _promiseMiddleware = require("./promiseMiddleware");

var _promiseMiddleware2 = _interopRequireDefault(_promiseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * NOTE: this does not seem to work with other middleware. Not sure what I'm doing wrong.
 */
var enhancer = function enhancer() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.defaultConfig;
  return function (createStore) {
    return function newCreateStore(reducer, preloadedState, enhancer) {
      var memoReducer = (0, _createReducer2.default)(config);

      function newReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        var _memo = state._memo,
            appState = _objectWithoutProperties(state, ["_memo"]);

        return _extends({
          _memo: memoReducer(_memo, action)
        }, reducer(appState, action));
      }

      var middleware = config.useMiddleware ? [_reduxThunk2.default, _promiseMiddleware2.default] : [_reduxThunk2.default];
      var newEnhancer = enhancer ? (0, _redux.compose)(enhancer, _redux.applyMiddleware.apply(undefined, middleware)) : _redux.applyMiddleware.apply(undefined, middleware);

      return createStore(newReducer, preloadedState, newEnhancer);
    };
  };
};

exports.default = enhancer;