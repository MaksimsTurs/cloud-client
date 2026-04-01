import type { ReactNode } from "react";
import type { SerializedError } from "@root/global.type";

import { Fragment, useEffect, useState } from "react";

import Metadata from "@component/Metadata/Metadata.component";
import Empty from "@ui/Empty/Empty.component";

import http from "@util/http/http.util";
import scall from "@util/scall/scall.util";
import serializeError from "@util/serialize-error.util";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";

export default function Page(): ReactNode {
  const [error, setError] = useState<SerializedError | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const requestConfirmEmail = async (): Promise<void> => {
      setIsLoading(true);

      const result = await scall<void>(async () => {
        await http.get("/user/request-confirm-email", { credentials: "include" });
      });

      if(result.getError()) {
        const error: SerializedError = await serializeError(result.getError());
        
        if(error.code === 403) {
          navigate("/");
        } else {
          setError(error);
        }
      }
          
      setIsLoading(false);
    };

    requestConfirmEmail();
  }, []);

  if(isLoading) {
    return(
      <Fragment>
        <Metadata title="Request confirm e - mail"/>
        <Empty 
          main="Requesting e - mail confirmation."/>
      </Fragment>
    );
  }

  if(error) {
    return(
      <Fragment>
        <Metadata title="Request confirm E - mail"/>
        <Empty
          header={error.code}
          main={error.message}/>
      </Fragment>
    );
  }

  return(
    <Fragment>
      <Metadata title="Request confirm e - mail"/>
      <Empty
        main="Confirm e - mail has been sended, check you e - mail post."/>
    </Fragment>
  );
};
