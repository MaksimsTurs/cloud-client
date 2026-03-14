import type { HTTPRequestOptions } from "../http.type";

class HTTPError extends Error {
  public path: string;
  public response: Response;
  public options?: HTTPRequestOptions;

  constructor(path: string, response: Response, options?: HTTPRequestOptions) {
    super(`${path} responsed with code ${response.status}`);

    this.path = path;
    this.response = response;
    this.options = options;
  };
};

export default HTTPError
