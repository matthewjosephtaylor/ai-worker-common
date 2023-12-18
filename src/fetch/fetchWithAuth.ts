import { authTokenToAuthHeader } from "../common/authTokenToAuthHeader";
import { orError } from "../common/orError";
import { FetchOptions } from "./FetchOptions";

export const fetchWithAuth = async <T extends BodyInit = BodyInit>(
  url: string,
  data?: T | string,
  options: FetchOptions & Partial<{ authToken: string }> = {}
): Promise<Response> => {
  const { headers = {}, signal, authToken } = options;
  const authHeaders = authToken ? authTokenToAuthHeader(authToken) : {};
  const resp = await orError(() =>
    fetch(url, {
      signal,
      ...options,
      headers: {
        ...authHeaders,
        ...headers,
      },
      body: data,
    })
  );
  if (options.signal?.aborted) {
    return new Response("Fetch aborted", { status: 499 });
  }
  if (resp instanceof Error) {
    return new Response(`fetch failed for: ${url}`, {
      status: 555,
    });
  }
  return resp;
};