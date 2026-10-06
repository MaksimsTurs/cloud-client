import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";
import type { UserLogUp } from "./Page.type";
import type { SerializedError } from "@root/global.type";

import Metadata from "@component/Metadata/Metadata.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import InputCheckbox from "@root/ui/Input-Checkbox/Input-Checkbox.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import { Link } from "@hook/use-react-router/use-react-router.hook";
import { FormContainer, FormBody, FormHeader, FormFooter } from "@ui/Form/Form.component";

import { useForm } from "react-hook-form";
import { Fragment } from "react";

import { useAuth } from "@service/auth/auth.service";
import { useNavigate } from "@hook/use-react-router/use-react-router.hook";

import scss from "./Page.module.scss";

import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";

import VALIDATION_RULES from "@root/const/VALIDATION_RULES.const";

export default function Page(): ReactNode {
  const methods = useForm<UserLogUp>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const { error, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const { getValues, formState: { isSubmitting }} = methods; 

  const logUp: SubmitHandler<UserLogUp> = async (userData: UserLogUp): Promise<void> => {
    const isOk: boolean = await authenticate(async (): Promise<UseAuthEndpointResponse> => {
      return await http.post<UseAuthEndpointResponse>("/user/log-up", { 
        body: userData, 
        credentials: "include" 
      });
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
    <div className={scss.page_container}>
      <Metadata title="Log up"/>
      <Metadata name="description" content="Log up page, here you can create a new Account to get access to application functionality."/>
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
            options={VALIDATION_RULES.USER.EMAIL()}/>
          <InputText
            type="text"
            name="pseudonym"
            placeholder="Unique Pseudonym"
            autoComplete="username"
            options={VALIDATION_RULES.USER.PSEUDONYM()}/>
          <InputText
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            options={VALIDATION_RULES.USER.PASSWORD()}/>
          <InputText
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            options={{
              ...VALIDATION_RULES.USER.PASSWORD(),
              validate: checkPasswordsEquality
            }}/>
          <InputCheckbox 
            name="privacyPolicy" 
            label={
              <Fragment>
                I accept our <Link href="/about-us#privacy-policy">Privacy Policy.</Link>
              </Fragment>
            }
            options={VALIDATION_RULES.USER.PRIVACY_POLICY()}/>
          <FormFooter>
            <TextButton type="submit" text="Submit" disabled={isSubmitting}/>
            <Link href="/log-in">Have account?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </div>
  );
};
