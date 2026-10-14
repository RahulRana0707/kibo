/**
 * How a query reaches the API: `apiClientFetch` in the browser,
 * `apiServerFetch` (which forwards the visitor's cookie) when a page
 * prefetches on the server.
 */
export type ApiFetcher = <T>(path: string, init?: RequestInit) => Promise<T>
