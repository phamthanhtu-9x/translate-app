import {FetchResponse, UseAsyncDataOptions} from '@nuxt/kit';

declare module '@nuxt/kit' {
  interface FetchResponse<T = any> extends Response {
    data: T;
  }

  interface UseAsyncDataOptions<TData = any, TParams = any> {
    fetch?: (
      context: Context,
      options: UseAsyncDataOptions<TData, TParams>,
    ) => Promise<FetchResponse<TData>>;
  }
}
