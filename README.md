# redux-promise-memo

`redux-promise-memo` lets you "memoize" asynchronous, promise-based, action
creators. If the promise has completed successfully, it will not be dispatched
again unless the action creator arguments change. The memoized action creator
can be called multiple times (e.g. in `componentDidUpdate`) and it will do
nothing unless the arguments change.

"memoize" is in quotes because it remembers meta information about the action
creator but not the actual data. Apps that use Redux are already "caching" the
data in Redux state.

 - it also does not dispatch duplicate actions if the promise is in a pending state
   (e.g. API data is loading)
 - it works stand-alone, with `redux-promise-middleware`, or GlueStick's `promiseMiddleware`
 - it works with client side and server side rendering (universal / isomorphic apps)
   because metadata is stored in Redux state
 - it supports either a single cache per action type or infinite caches per action type
   (see `multipleCaches` option passed to `memoize`)
 - it supports cache invalidation by providing an app-specific invalidation function
   (see `invalidate` config passed to `createMemoReducer`)

## Inspiration

`redux-promise-memo` was inspired by Dan Abramov's comment about `redux-thunk`:

> There are differing opinions on whether accessing state in action creators is
> a good idea. The few use cases where I think it’s acceptable is for checking
> cached data before you make a request, or for checking whether you are
> authenticated...
 
from https://stackoverflow.com/questions/35667249/accessing-redux-state-in-an-action-creator/35674575#35674575

## Install

`redux-promise-memo` uses `redux-thunk` so if you are not already using
`redux-thunk`, you must install it as well.

```
npm install redux-promise-memo redux-thunk
```

or

```
yarn add redux-promise-memo redux-thunk
```

## Usage (stand alone)

`path/to/your/root/reducer`:
```
import { combineReducers } from "redux";
import { createMemoReducer } from "redux-promise-memo";

// IMPORTANT: the Redux state slice must be named `_memo`
// because the `memoize` decorator looks for it there.
const _memo = createMemoReducer();
const your = (state, action) => ({});
const other = (state, action) => ({});
const reducers = (state, action) => ({});
const rootReducer = combineReducers({_memo, your, other, reducers});

export default rootReducer;
```

`configureStore.js`:
```
import { applyMiddleware, createStore } from "redux";
import { createMemoReducer, promiseMiddleware } from "redux-promise-memo";
import thunk from "redux-thunk";
import reducer from "./path/to/your/root/reducer";

const middleware = [thunk, promiseMiddleware];
const store = createStore(reducer, applyMiddleware(...middleware));
```

`actions.js`:

```
import { memoize } from "redux-promise-memo";

const fetchSomething = (id) => ({
  type: "FETCH_SOMETHING",
  promise: fetch("/my/url")
});
export const memoizedFetchSomething = memoize(fetchSomething, "FETCH_SOMETHING");
```

Then use `memoizedFetchSomething` the same way you would have used `fetchSomething`.
See `examples/basic-example/src/index.js` for a full working example.

## Configuration

`createMemoReducer` can optionally be passed a configuration object.

```
type Config = {
  invalidate: (state: State, action: Object) => boolean,
  initMatcher: (action: Object) => boolean,
  successMatcher: (action: Object) => boolean,
  failureMatcher: (action: Object) => boolean,
};
```

## Assumptions / limitations

- it does not work with `redux-thunk` action creators
- if using server rendering, the promise returned when dispatching the action is
  used for timing purposes only (i.e. the promise value is not used). The return
  value of the action dispatch is stored in a variable in the `memoize` function
  and used via closure. When transitioning from server rendering to client
  rendering, the Redux state is preserved, allowing for memoization from server
  to client. But the return value variable is not preserved so the promise
  resolved value cannot be used. An empty resolved promise is returned instead.

## Examples

- [basic-example](https://github.com/saltycrane/redux-promise-memo/examples/basic-example)
- [with-gluestick](https://github.com/saltycrane/redux-promise-memo/examples/with-gluestick)
- [with-redux-promise-middleware](https://github.com/saltycrane/redux-promise-memo/examples/with-redux-promise-middleware)

## API

- `createMemoReducer(config)`
   ```
   Return a reducer that must be used with the `memoize` decorator.
   
   IMPORTANT: the reducer must be added to the root reducer using the key name `_memo`.
   
   `config` (Object):

    {
      invalidate: (state, action) => boolean,
      initMatcher: action => boolean,
      failureMatcher = action => boolean,
      successMatcher = action => boolean,
    }
   ```

- `defaultConfig` - this is the default config that is used if no config object is
   passed to `createMemoReducer`

- `reduxPromiseMiddlewareConfig` - this config is to be used with `redux-promise-middleware`

- `memoize(actionCreator, key, [options])`

    ```
    Return a "memoized" version of a promise action creator.
    The memoized version will not dispatch the action if:
      - the promise has not resolved (e.g. api request is still loading)
      - the action has already been dispatched with the same arguments

    Assumptions:
      - the action creator returns a simple object (i.e. it is not a thunk action creator)

    `multipleCaches` option:

    Normally `memoize` only checks if the current call matches the immediately preceding
    call and re-fetches if it doesn't.
    For example, if an action is called with a set of arguments, then called with a second
    set of arguments, then called with the first set of arguments again, the last call will
    be re-fetched. If you store the responses for each API call separately, then
    set the `multipleCaches` option to true and `memoize` will always use the cached
    version if the arguments match.

    Usage:
      const fetchSomething = memoize(_fetchSomething, "FETCH_SOMETHING");
    or
      const fetchSomething = memoize(_fetchSomething, "FETCH_SOMETHING" {multipleCaches: true});
    ```

- `promiseMiddleware`

   ```
   For a given action:
   
   const fetchSomething = () => ({
     type: "FETCH_SOMETHING",
     promisse: fetch("/something")
   });
   
   promiseMiddleware will dispatch 2 actions. The first is dispatched immediately:
   
   {
     type: "FETCH_SOMETHING_INIT"
   }
   
   the second action is dispatched either after the promise is fulfilled:
   
   {
     type: "FETCH_SOMETHING",
     payload: "the payload is set to the resolved value of the promise"
   }
   
   or when the promise is rejected:
   
   {
     type: "FETCH_SOMETHING_FAILURE",
     error: "error goes here"
   }
   
   promiseMiddleware was copied from GlueStick
   ```

## To do

- I tried to write a Redux store enhancer to make configuration less tedious but
  I did not get it to work with other middleware. If you know the problem,
  please let me know.
