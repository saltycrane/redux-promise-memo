import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { createMemoReducer, memoize, promiseMiddleware } from "../src";

describe("memoize decorator", () => {
  function _fetchSomething(id1, id2) {
    return {
      type: "FETCH_SOMETHING",
      promise: new Promise(resolve => {
        fetchSpy(id1, id2);
        resolve();
      })
    };
  }

  let fetchSpy;
  let store;
  beforeEach(() => {
    fetchSpy = jest.fn();

    const _memo = createMemoReducer();
    const middleware = [thunk, promiseMiddleware];
    store = createStore(combineReducers({ _memo }), applyMiddleware(...middleware));
  });

  it("makes an api request on first use", () => {
    const memoizedFetchSomething = memoize(_fetchSomething, "FETCH_SOMETHING");
    store.dispatch(memoizedFetchSomething(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("does not make an api request if already called with the same arguments", async () => {
    const fetchSomething = memoize(_fetchSomething, "FETCH_SOMETHING");
    await store.dispatch(fetchSomething(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    store.dispatch(fetchSomething(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("makes an api request if called with different arguments", async () => {
    const fetchSomething = memoize(_fetchSomething, "FETCH_SOMETHING");
    await store.dispatch(fetchSomething(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    store.dispatch(fetchSomething(101, 301));
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("does not make an api request if another request is still loading", () => {
    function _fetchSomethingAndItTakesForever(id1, id2) {
      return {
        type: "FETCH_SOMETHING",
        promise: new Promise(() => {
          fetchSpy(id1, id2);
        })
      };
    }
    const fetchSomethingAndItTakesForever = memoize(_fetchSomethingAndItTakesForever, "FETCH_SOMETHING");
    store.dispatch(fetchSomethingAndItTakesForever(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    store.dispatch(fetchSomethingAndItTakesForever(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("makes an api request if previous request failed", async () => {
    function _fetchSomethingAndItFails(id1, id2) {
      return {
        type: "FETCH_SOMETHING",
        promise: new Promise((resolve, reject) => {
          fetchSpy(id1, id2);
          reject({statusText: "there was an error"});
        })
      };
    }
    const fetchSomethingAndItFails = memoize(_fetchSomethingAndItFails, "FETCH_SOMETHING");
    await store.dispatch(fetchSomethingAndItFails(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    store.dispatch(fetchSomethingAndItFails(101, 201));
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("returns a resolved promise if action is null", () => {
    function returnsNull() {
      return null;
    }
    const memoized = memoize(returnsNull, "FETCH_SOMETHING");
    const result = store.dispatch(memoized());
    expect(result).toBeInstanceOf(Promise);
  });
});
