import type { UseWithAuthEndpointResponse } from "@service/auth/hooks/use-with-auth.type";

import http from "./http/http.util";

export default async function generateRefreshToken(): Promise<UseWithAuthEndpointResponse | undefined> {
  return http.get<UseWithAuthEndpointResponse>("/user/refresh-token", { credentials: "include" });
};
