import type { ReactNode } from "react";
import type { UserLogIn } from "./Page.type";
import type { SubmitHandler } from "react-hook-form";
import type { SerializedError } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";

import { useForm } from "react-hook-form";

import InputText from "@ui/Form/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import Metadata from "@component/Metadata/Metadata.component";
import { FormBody, FormContainer, FormHeader, FormFooter } from "@ui/Form/Form/Form.component";
import { Link } from "@hook/use-react-router/use-react-router.hook";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";
import { useAuth} from "@service/auth/auth.service";

import serializeError from "@util/serialize-error.util";
import http from "@util/http/http.util";

import scss from "./Page.module.scss"

export default function Page(): ReactNode {
  const { register, handleSubmit, formState: { errors }} = useForm<UserLogIn>();
  const { isLoading, error, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const logIn: SubmitHandler<UserLogIn> = async (userData): Promise<void> => {
    const isSucceed: boolean = await authenticate(async () => {
      return await http.post<UseAuthEndpointResponse>("/user/log-in", {
        body: userData,
        credentials: "include"
      });
    });

    if(isSucceed) {
      navigate("/");
    }
  };

  return(
    <main className={scss.page_container}>
      <Metadata title="Log in"/>
      <Metadata name="description" content="Log in you'r account."/>
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
            <TextButton text="Log in" type="submit" disabled={isLoading}/>
            <Link href="/request-reset-password">Forgot password?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </main>
 );
};
