import * as React from "react";

import { UseAsyncState, AsyncState } from "./types";

function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (state: T) => (mounted.current ? dispatch(state) : void 0),
    [dispatch]
  );
}

const defaultInitialState = {
  status: undefined,
  data: undefined,
  error: undefined,
};

export function useAsync<T>(initialState?: UseAsyncState<T>) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data: stateData, error: stateError }, setState] =
    React.useReducer<(prevState: any, nextState: any) => UseAsyncState<T>>(
      (prevState, nextState) => ({ ...prevState, ...nextState }),
      initialStateRef.current
    );

  const safeSetState = useSafeDispatch<UseAsyncState<T>>(setState);

  const setData = React.useCallback(
    (data: T) => safeSetState({ data, status: "loaded" }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error: Error) => safeSetState({ error, status: "error" }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise: Promise<T>): Promise<T> => {
      if (!promise || !promise.then) {
        throw new Error(
          // eslint-disable-next-line max-len
          `The argument passed to useAsync().run must be a promise.`
        );
      }
      safeSetState({ status: "loading", data: undefined });

      return promise.then(
        (data: T) => {
          setData(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === undefined,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "loaded",

    setData,
    setError,
    error: stateError,
    status,
    data: stateData,
    run,
    reset,
  };
}

export type { AsyncState, UseAsyncState };
export default useAsync;