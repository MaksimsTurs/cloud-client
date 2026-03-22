import type { ReactNode } from "react";
import type { RequestResetPassword } from "./Page.type";
import type { SubmitHandler } from "react-hook-form";
import type { SerializedError } from "@root/global.type";

import { Fragment } from "react";
import { useForm } from "react-hook-form";

import Metadata from "@component/Metadata/Metadata.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import { AlertContainer } from "@ui/Alert/Alert.component";
import { FormContainer, FormBody, FormFooter } from "@ui/Form/Form.component";

import scall from "@util/scall/scall.util";
import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";

export default function Page(): ReactNode {
  const methods = useForm<RequestResetPassword>();

  const { setError, formState: { errors, isSubmitting }} = methods;

  const requestResetPassword: SubmitHandler<RequestResetPassword> = async (body): Promise<void> => {
    const result = await scall<void>(async () => {
      await http.post("/user/request-reset-password", { body });
    });

    if(result.getError()) {
      const error: SerializedError = await serializeError(result.getError());
      setError("root", { message: error.message });
    }
  };

  return(
    <Fragment>
      <Metadata title="Request reset password"/>
      <FormContainer>
        <FormBody {...methods } error={errors.root?.message} onSubmit={requestResetPassword}>
          <InputText
            name="email"
            type="email"
            placeholder="Confirm you E - mail"
            autoComplete="email"
            error={errors?.email?.message}
            options={{
              required: "E - mail is required!",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "E - mail is not valid!" }
            }}/>
          <AlertContainer type="info">
            After submitting you will get a E - mail with Link which you then can reset the password.
          </AlertContainer>
          <FormFooter>
            <TextButton text="Request reset password" disabled={isSubmitting}/>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </Fragment>
  );
};
