import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";
import type { UserLogUp } from "./Page.type";
import type { SerializedError } from "@root/global.type";

import Metadata from "@component/Metadata/Metadata.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import { Link } from "@hook/use-react-router/use-react-router.hook";
import { FormContainer, FormBody, FormHeader, FormFooter } from "@ui/Form/Form.component";

import { useForm } from "react-hook-form";

import { useAuth } from "@service/auth/auth.service";
import { useNavigate } from "@hook/use-react-router/use-react-router.hook";

import scss from "./Page.module.scss";

import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";

export default function Page(): ReactNode {
  const methods = useForm<UserLogUp>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const { error, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const { getValues, formState: { isSubmitting }} = methods; 

  const logUp: SubmitHandler<UserLogUp> = async (userData): Promise<void> => {
    const isOk: boolean = await authenticate(async () => {
      return await http.post<UseAuthEndpointResponse>("/user/log-up", { body: userData, credentials: "include" })
    });

    if(isOk) {
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
    <main className={scss.page_container}>
      <Metadata title="Log up"/>
      <Metadata name="description" content="Create new user."/>
      <FormContainer>
        <FormBody<UserLogUp>
          {...methods } 
          onSubmit={logUp} 
          error={error?.message}>
          <FormHeader title="Log up"/>
          <InputText
            type="email"
            name="email" 
            placeholder="E - mail"
            autoComplete="username"
            options={{
              required: "E - mail is required!",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "E - mail is not valid!" }
            }}/>
          <InputText
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            options={{
              required: "Password is required!",
              minLength: { value: 12, message: "Password is to short!" },
              validate: checkPasswordsEquality
            }}/>
          <InputText
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            options={{
              required: "Confirm password is required!",
              minLength: { value: 12, message: "Confirm password is to short!" },
              validate: checkPasswordsEquality
            }}/>
          <FormFooter>
            <TextButton type="submit" text="Registrate" disabled={isSubmitting}/>
            <Link href="/log-in">Have account?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </main>
  );
};
