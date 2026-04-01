import type { ReactNode } from "react";

import { Fragment } from "react";

import Metadata from "@component/Metadata/Metadata.component";
import Empty from "@ui/Empty/Empty.component";
import TextButton from "@root/ui/Text-Button/Text-Button.component";
import CommonSkeleton from "@root/ui/Common-Skeleton/Common-Skeleton.component";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";
import useSendConfirmEmail from "@hook/use-send-confirm-email/use-send-confirm-email.hook";

export default function Page(): ReactNode {
  const { isLoading, error } = useSendConfirmEmail();
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
        <Metadata title="Request confirm E - mail"/>
        <Empty
          header={error.code}
          main={error.message}
          footer={<TextButton text="Go Home" onClick={goHome}/>}/>
      </Fragment>
    );
  }

  return(
    <Fragment>
      <Metadata title="Request confirm e - mail"/>
      <Empty
        header="Account confirmation"
        main="Confirm e - mail has been sended, check you post, don't forget that e - mail will expire in 5 minutes!"
        footer={<TextButton text="Go Home" onClick={goHome}/>}/>
    </Fragment>
  );
};
