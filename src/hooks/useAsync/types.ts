export type AsyncState<T = unknown, E extends Error = Error> =
  | (Partial<T> & {
      status?: "loading" | undefined;
      error?: undefined;
    })
  | (Partial<T> & {
      status: "error";
      error: E;
    })
  | (T & {
      status: "loaded";
      error?: undefined;
    });

export type UseAsyncState<T> = AsyncState<{ data: T }>;
