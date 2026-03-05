import { FetcherHeaders, FormatedInit } from "../fetcher.type";

export default function formatInit(body?: any, headers?: FetcherHeaders): FormatedInit {
	headers = headers ? headers : {};
	body    = body ? body : {};

	if((body && headers) && !(body instanceof FormData)) {
		headers["Content-Type"] = "application/json";
		body = JSON.stringify(body);
	}

	return { headers, body };
};