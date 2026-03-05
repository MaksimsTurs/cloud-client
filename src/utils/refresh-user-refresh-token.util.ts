import type { UseWithAuthEndpointResponse } from "@service/auth/hook/use-with-auth.type";

import fetcher from "@util/fetcher/fetcher.util";

export default async function refreshUserRefreshToken(): Promise<UseWithAuthEndpointResponse | undefined> {
  const { data, error } = await fetcher.get<UseWithAuthEndpointResponse>("/user/refresh-token", { credentials: "include" });
            
  if(error) {
    throw error;
  }

  return data;
};
