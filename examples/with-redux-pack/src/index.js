import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reduxPack from "redux-pack";
import { createMemoReducer, memoize } from "redux-promise-memo";
import thunk from "redux-thunk";

/**
 * Fake fetch function that returns a promise
 */
const fakeFetch = url =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve("some value");
    }, 500);
  });

/**
 * Action creators
 */
const fetchSomething1 = id => ({
  type: "FETCH_SOMETHING1",
  promise: fakeFetch("/my/fake/url/1"),
});

const _fetchSomething2 = id => ({
  type: "FETCH_SOMETHING2",
  promise: fakeFetch("/my/fake/url/2"),
});
const memoizedFetchSomething2 = memoize(_fetchSomething2, "FETCH_SOMETHING2");

/**
 * Components
 */
class MyComponentThatFetches extends Component {
  componentDidUpdate() {
    const { a, dispatch } = this.props;
    dispatch(fetchSomething1(a));
    dispatch(memoizedFetchSomething2(a));
  }

  render() {
    return <div />;
  }
}

const MyComponentThatFetchesContainer = connect()(MyComponentThatFetches);

class App extends Component {
  state = {
    a: 0,
    b: 0,
  };

  render() {
    const { count1, count2 } = this.props;
    const { a, b } = this.state;

    return (
      <div>
        <h2>with redux-pack example</h2>
        <p>Open your browser's developer tools console to view logging</p>
        <button onClick={() => this.setState({ a: a + 1 })}>Change prop a</button>
        <button onClick={() => this.setState({ b: b + 1 })}>Change prop b</button>
        <hr />
        <div>
          <div>Prop a: {a}</div>
          <div>Prop b: {b}</div>
          <div>Un-memoized fetch count: {count1}</div>
          <div>Memoized fetch count: {count2}</div>
        </div>
        <MyComponentThatFetchesContainer a={a} b={b} />
      </div>
    );
  }
}

const AppContainer = connect(state => ({
  count1: state.count1,
  count2: state.count2,
}))(App);

/**
 * Reducers
 */
const reduxPackMemoConfig = {
  invalidate: (state, action) => false,
  initMatcher: action => action.meta[reduxPack.KEY.LIFECYCLE] === reduxPack.LIFECYCLE.START,
  failureMatcher: action => action.meta[reduxPack.KEY.LIFECYCLE] === reduxPack.LIFECYCLE.FAILURE,
  successMatcher: action => action.meta[reduxPack.KEY.LIFECYCLE] === reduxPack.LIFECYCLE.SUCCESS,
};
// Important: the Redux slice must be named `_memo` because `memoize` looks for it there.
const _memo = createMemoReducer(reduxPackMemoConfig);
const count1 = (state = 0, action) =>
  action.type === "FETCH_SOMETHING1"
    ? reduxPack.handle(state, action, { success: prevState => prevState + 1 })
    : state;
const count2 = (state = 0, action) =>
  action.type === "FETCH_SOMETHING2"
    ? reduxPack.handle(state, action, { success: prevState => prevState + 1 })
    : state;
const knicks = (state = []) => state;
const knacks = (state = {}) => state;
const reducer = combineReducers({ _memo, count1, count2, knicks, knacks });

/**
 * Redux store
 */
const middleware = [thunk, reduxPack.middleware];
const store = createStore(reducer, applyMiddleware(...middleware));

/**
 * Render to DOM
 */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root"),
);
