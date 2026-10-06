import type { ReactNode } from "react";

import { Fragment } from "react";

import { Link } from "@hook/use-react-router/use-react-router.hook";
import Empty from "@ui/Empty/Empty.component";

export default function NotAuthenticated(): ReactNode {
  return(
    <Empty
      header="Not Authenticated!"
      main="It looks like you either haven't logged into your account."
      footer={
      <Fragment>
        <Link href="/log-in">Log in</Link>or<Link href="/log-up">Log up</Link>
      </Fragment>
    }/>
  );
};
