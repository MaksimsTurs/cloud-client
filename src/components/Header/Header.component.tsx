import scss from "./Header.module.scss";

import type { ReactNode } from "react";
import type { UseAuthEndpointResponse } from "@service/auth/hook/use-auth.type";

import Navigation from "./components/Navigation.component";
import ActionsSection from "./components/Actions-Section.component";
import HeaderLoader from "./components/Header-Loader.component";

import { useAuth } from "@service/auth/auth.service";

import serializeError from "@util/serialize-error.util";
import fetcher from "@util/fetcher/fetcher.util";

import { Fragment, useEffect } from "react";

export default function Header(): ReactNode {
  const { isAuthorizing, isAuthorized, authorize } = useAuth({ serializeError });

  useEffect(() => {
    authorize(async () => {
      const { data, error } = await fetcher.get<UseAuthEndpointResponse>("/user/init", { credentials: "include" });
      
      if(error) {
        throw error;
      }

      return data;
    });
  }, []);

  return(
    <Fragment>
      {isAuthorizing ?
      <HeaderLoader/> :
      <header className={scss.header_container}>
        <Navigation/>
        {isAuthorized ? <ActionsSection/> : null}
      </header>}
    </Fragment>
  );
};
