import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";
import type { UserLogUp } from "./Page.type";
import type { SerializedError } from "@root/global.type";

import Metadata from "@component/Metadata/Metadata.component";
import InputText from "@ui/Form/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import { Link } from "@hook/use-react-router/use-react-router.hook";
import { FormContainer, FormBody, FormHeader, FormFooter } from "@ui/Form/Form/Form.component";

import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@service/auth/auth.service";
import { useNavigate } from "@hook/use-react-router/use-react-router.hook";

import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";

export default function Page(): ReactNode {
  const { 
    handleSubmit, 
    register, 
    getValues, 
    formState: { errors }
  } = useForm<UserLogUp>();
  const { error, isLoading, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const logUp: SubmitHandler<UserLogUp> = async (userData): Promise<void> => {
    const isSucceed: boolean = await authenticate(async () => {
      return await http.post<UseAuthEndpointResponse>("/user/log-up", { body: userData, credentials: "include" })
    });

    if(isSucceed) {
      navigate("/");
    }
  };

  const checkPasswordsEquality = (): string | undefined => {
    const password: string = getValues("password");
    const confirmPassword: string = getValues("confirmPassword");
    
    if(password != confirmPassword) {
      return "Passwords does not match!";
    }

    return undefined;
  };

  return(
    <Fragment>
      <Metadata title="Log up"/>
      <FormContainer>
        <FormHeader title="Log up"/>
        <FormBody onSubmit={handleSubmit(logUp)} error={error?.message}>
          <InputText 
            register={register}
            type="text"
            error={errors.email?.message}
            name="email" 
            placeholder="E - mail"
            autoComplete="email"
            options={{
              required: "E - mail is required!",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "E - mail is not valid!" }
            }}/>
          <InputText 
            register={register}
            type="password"
            error={errors.password?.message}
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            options={{
              required: "Password is required!",
              minLength: { value: 12, message: "Password is to short!" },
              validate: checkPasswordsEquality
            }}/>
          <InputText 
            register={register}
            type="password"
            error={errors.confirmPassword?.message}
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm Password"
            options={{
              required: "Confirm password is required!",
              minLength: { value: 12, message: "Confirm password is to short!" },
              validate: checkPasswordsEquality
            }}/>
          <FormFooter>
            <TextButton text="Registrate" disabled={isLoading}/>
            <Link href="/log-in">Have account?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </Fragment>
  );
};
