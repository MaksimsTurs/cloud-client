import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";

import http from "./http/http.util";

export default async function authorize(): Promise<UseAuthEndpointResponse> {
  return await http.get<UseAuthEndpointResponse>("/user/init", { credentials: "include" });
};
