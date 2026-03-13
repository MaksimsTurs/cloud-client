import scss from "./Header.module.scss";

import type { ReactNode } from "react";

import Navigation from "./components/Navigation.component";
import HeaderLoader from "./Header-Loader.component";

import { useAuthIsAuthorizing } from "@service/auth/auth.service";

import { Fragment } from "react";

export default function Header(): ReactNode {
  const isAuthorizing = useAuthIsAuthorizing();

  return(
    <Fragment>
      {isAuthorizing ?
      <HeaderLoader/> :
      <header className={scss.header_container}>
        <Navigation/>
      </header>}
    </Fragment>
  );
};
