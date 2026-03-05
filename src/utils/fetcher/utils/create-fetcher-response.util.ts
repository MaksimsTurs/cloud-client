import type { FetcherOptions, FetcherResponse } from "../fetcher.type";

export default async function createResponse<R = any, E = any>(response: Response, options?: FetcherOptions): Promise<FetcherResponse<R, E>> {
  const fetcherResponse: FetcherResponse = {
    headers: response.headers
  };

  if(response.ok) {
    fetcherResponse.data = await parseReponseContentAs<R>(response, options);
  } else {
    fetcherResponse.error = await parseReponseContentAs<E>(response);
  }

  return fetcherResponse;
};

async function parseReponseContentAs<A = unknown>(response: Response, options?: FetcherOptions): Promise<A> {
  const contentType: string | null = response.headers.get("Content-Type");

  if(options?.as) {
    switch(options.as) {
      case "text":
        return await response.text() as A;
      case "json":
        return await response.json() as A;
      case "blob":
        return await response.blob() as A;
    }
  }

  if(!contentType) {
    return await response.text() as A;
  }

  if(/text\/+/.test(contentType)) {
    return await response.text() as A;
  }

  if(/application\/json+/.test(contentType)) {
    return await response.json() as A;
  }

  if(/(audio|video|image)\/+/.test(contentType) ||
     contentType === "application/pdf") {
    return await response.blob() as A;
  }

  return await response.text() as A;
};
