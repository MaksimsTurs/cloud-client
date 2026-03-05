import type { ReactNode } from "react";
import type { UserLogIn } from "./Page.type";
import type { SubmitHandler } from "react-hook-form";
import type { SerializedError } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hook/use-auth.type";

import { useForm } from "react-hook-form";
import { Fragment } from "react";

import InputText from "@ui/Form/Input-Text/Input-Text.component";
import SubmitButton from "@ui/Submit-Button/Submit-Button.component";
import Title from "@component/Title/Title.component";
import { Link } from "@root/index";
import { FormBody, FormContainer, FormHeader, FormFooter } from "@ui/Form/Form/Form.component";

import { useAuth } from "@service/auth/auth.service";
import useNavigate from "@hook/use-react-router/use-navigate.hook";

import serializeError from "@util/serialize-error.util";
import fetcher from "@util/fetcher/fetcher.util";

export default function Page(): ReactNode {
  const { register, handleSubmit, formState: { errors }} = useForm<UserLogIn>();
  const { isLoading, error, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const logIn: SubmitHandler<UserLogIn> = async (userData): Promise<void> => {
    const error = await authenticate(async () => {
      const { data, error } = await fetcher.post<UseAuthEndpointResponse>("/user/log-in", userData, { credentials: "include" });
      
      if(error) {
        throw error;
      }

      return data;
    });

    if(!error) {
      navigate("/");
    }
  };

  return(
    <Fragment>
      <Title>Log in</Title>
      <FormContainer>
        <FormHeader title="Log in"/>
        <FormBody onSubmit={handleSubmit(logIn)} error={error?.message}>
          <InputText 
            register={register}
            type="text"
            error={errors.email?.message}
            name="email" 
            placeholder="E - mail"
            options={{
              required: "E - mail is required!",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "E - mail is not valid!" }
            }}/>
          <InputText 
            register={register}
            type="password"
            error={errors.password?.message}
            name="password"
            placeholder="Password"
            options={{
              required: "Password is required!",
              minLength: { value: 12, message: "Password is to short!" },
            }}/>
          <FormFooter>
            <SubmitButton text="Log in" disabled={isLoading}/>
            <Link href="/forgot-password">Forgot password?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </Fragment>
 );
};
