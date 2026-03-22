import type { ReactNode } from "react";
import type { ResetPassword } from "./Page.type";
import type { SerializedError } from "@root/global.type";
import type { SubmitHandler } from "react-hook-form";

import { Fragment } from "react";
import { useForm } from "react-hook-form";

import Metadata from "@component/Metadata/Metadata.component";
import Empty from "@ui/Empty/Empty.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import { FormContainer, FormBody, FormFooter } from "@ui/Form/Form.component";

import { useNavigate, useSearchParams } from "@hook/use-react-router/use-react-router.hook";

import scall from "@util/scall/scall.util";
import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";

export default function Page(): ReactNode {
  const methods = useForm<ResetPassword>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setError, formState: { errors, isSubmitting }} = methods; 

  const resetPassword: SubmitHandler<ResetPassword> = async (resetPasswordData): Promise<void> => {
    const result = await scall<void>(async () => {
      await http.put("/user/reset-password", { 
        body: {...resetPasswordData, token: searchParams.get("token") }
      });
    });

    if(result.getError()) {
      const error: SerializedError = await serializeError(result.getError());
      setError("root", { message: error.message });
    } else {
      navigate("/");
    }
  };

  if(!searchParams.has("token") || !searchParams.get("token")) {
    return(
      <Fragment>
        <Metadata title="Reset password"/>
        <Empty
          header="Token is invalid"
          main="Looks like you have no requested the password reseting, request password reseting first!"/>
      </Fragment>
    );
  }

  return(
    <Fragment>
      <Metadata title="Reset password"/>
      <FormContainer>
        <FormBody {...methods } error={errors.root?.message} onSubmit={resetPassword}>
          <InputText
            name="password"
            type="password"
            placeholder="New password"
            autoComplete="new-password"
            error={errors?.password?.message}
            options={{
              required: "New password is required!",
              minLength: { value: 12, message: "Password is to short!" },
            }}/>
          <FormFooter>
            <TextButton text="Reset password" disabled={isSubmitting}/>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </Fragment>
  );
};
