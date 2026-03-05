import { Fragment, type ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UseAuthEndpointResponse } from "@service/auth/hook/use-auth.type";
import type { UserLogUp } from "./Page.type";
import type { SerializedError } from "@root/global.type";

import Title from "@component/Title/Title.component";
import InputText from "@ui/Form/Input-Text/Input-Text.component";
import SubmitButton from "@ui/Submit-Button/Submit-Button.component";
import { Link } from "@root/index";
import { FormContainer, FormBody, FormHeader, FormFooter } from "@ui/Form/Form/Form.component";

import { useForm } from "react-hook-form";

import useAuth from "@service/auth/hook/use-auth.hook";
import useNavigate from "@hook/use-react-router/use-navigate.hook";

import fetcher from "@util/fetcher/fetcher.util";
import serializeError from "@util/serialize-error.util";

export default function Page(): ReactNode {
  const { handleSubmit, register, getValues, formState: { errors }} = useForm<UserLogUp>({ mode: "onSubmit" });
  const { error, isLoading, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const logUp: SubmitHandler<UserLogUp> = async (userData) => {
    const error = await authenticate(async () => {
      const { data, error } = await fetcher.post<UseAuthEndpointResponse>("/user/log-up", userData, { credentials: "include" })
      
      if(error) {
        throw error;
      }

      return data;
    });

    if(!error) {
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
      <Title>Log up</Title>
      <FormContainer>
        <FormHeader title="Log Up"/>
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
            <SubmitButton text="Registrate" disabled={isLoading}/>
            <Link href="/log-in">Have account?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </Fragment>
  );
};
