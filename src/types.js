/* @flow */

export type Config = {
  invalidate: (action: Object) => boolean | Array<string>,
  initMatcher: (action: Object) => boolean,
  successMatcher: (action: Object) => boolean,
  failureMatcher: (action: Object) => boolean,
};

export type MemoizeOptions = {
  multipleCaches?: boolean,
};

export type State = {
  [memoKey: string]: {
    [memoSubKey: string]: {
      status: "loading" | "error" | "success",
    },
  },
};
