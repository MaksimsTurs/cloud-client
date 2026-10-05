import type { ReactNode } from "react";
import type { RequestSomeEmailFromServer, RequestSomeEmailFromServerProps } from "./Page.type";
import type { SubmitHandler } from "react-hook-form";
import type { SerializedError } from "@root/global.type";

import { Fragment } from "react";
import { useForm } from "react-hook-form";

import TextButton from "@ui/Text-Button/Text-Button.component";
import SomeInputs from "./components/Some-Inputs.component";
import { AlertContainer } from "@ui/Alert/Alert.component";
import { FormContainer, FormBody, FormHeader, FormFooter } from "@ui/Form/Form.component";

import scall from "@util/scall/scall.util";
import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";
import generateRefreshToken from "@util/generate-refresh-token.util";

import { useWithAuth } from "@service/auth/auth.service";
import { useNavigate } from "@hook/use-react-router/use-react-router.hook";

export default function Page({ url, metadata, formHeader }: RequestSomeEmailFromServerProps): ReactNode {
  const methods = useForm<RequestSomeEmailFromServer>();
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const { setError, formState: { errors, isSubmitting }} = methods;

  const requestSomeEmail: SubmitHandler<RequestSomeEmailFromServer> = async (body): Promise<void> => {
    switch(url) {
      case "/user/request-confirm-email": {
        const result = await withAuth({
          generateRefreshToken,
          apiRequest: async () => {
            await http.post(url, { body, credentials: "include" });
          }
        });
          
        if(result.getError()) {
          const error: SerializedError = await serializeError(result.getError());
          setError("root", { message: error.message });
        } else {
          navigate("/");
        }
      }
      break
      case "/user/request-reset-password": {
        const result = await scall<void>(async () => {
          await http.post(url, { body });
          
          if(result.getError()) {
            const error: SerializedError = await serializeError(result.getError());
            setError("root", { message: error.message });
          } else {
            navigate("/");
          }
        });
      }
      break
    }
  };

  return(
    <Fragment>
      {metadata}
      <FormContainer>
        <FormBody
          {...methods } 
          error={errors.root?.message} 
          onSubmit={requestSomeEmail}>
          <FormHeader title={formHeader}/>
          <SomeInputs url={url}/>
          <AlertContainer type="info">
            After submitting, we will send you an e-mail with a link, this link will expire in 5 minutes!
          </AlertContainer>
          <FormFooter>
            <TextButton text="Submit" disabled={isSubmitting}/>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </Fragment>
  );
};
