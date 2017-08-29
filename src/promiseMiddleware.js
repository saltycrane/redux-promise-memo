/* @flow */
/**
 * This promise middleware was copied from GlueStick.
 * https://github.com/TrueCar/gluestick/blob/v1.13.7/packages/gluestick/shared/lib/promiseMiddleware.js
 */
const promiseMiddleware = (store: Object) => (next: Function) => (action: Object) => {
  const { type, promise, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  next({ ...rest, type: `${type}_INIT` });

  return promise.then(
    response => {
      next({ ...rest, type, payload: response });
      return response;
    },
    error => {
      next({ ...rest, type: `${type}_FAILURE`, error });
      return false;
    },
  );
};

export default promiseMiddleware;
