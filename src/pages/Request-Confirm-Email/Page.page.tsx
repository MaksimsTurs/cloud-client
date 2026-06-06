import type { ReactNode } from "react";

import { Fragment } from "react";

import Metadata from "@component/Metadata/Metadata.component";
import Empty from "@ui/Empty/Empty.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import CommonSkeleton from "@ui/Common-Skeleton/Common-Skeleton.component";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";
import useRequestConfirmEmail from "@hook/use-request-confirm-email/use-request-confirm-email.hook";

export default function Page(): ReactNode {
  const { isLoading, error } = useRequestConfirmEmail();
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate("/");
  };

  if(isLoading) {
    return(
      <Fragment>
        <Metadata title="Request confirm e - mail"/>
        <CommonSkeleton/>
      </Fragment>
    );
  }

  if(error) {
    return(
      <Fragment>
        <Metadata title="Request confirm e - mail"/>
        <Empty
          header={error.code}
          main={error.message}
          footer={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextButton text="Go Home" onClick={goHome}/>
            </div>
          }/>
      </Fragment>
    );
  }

  return(
    <Fragment>
      <Metadata title="Request confirm e - mail"/>
      <Empty
        header="Account confirmation"
        main="Confirm e - mail has been sended, check you post. The link will expire in 5 minutes!"
        footer={<TextButton text="Go Home" onClick={goHome}/>}/>
    </Fragment>
  );
};
