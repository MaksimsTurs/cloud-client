import type { ReactNode } from "react";
import type { UserLogIn } from "./Page.type";
import type { SubmitHandler } from "react-hook-form";
import type { SerializedError } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";

import { useForm } from "react-hook-form";

import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import { FormBody, FormContainer, FormHeader, FormFooter } from "@ui/Form/Form.component";
import { Link } from "@hook/use-react-router/use-react-router.hook";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";
import { useAuth} from "@service/auth/auth.service";

import serializeError from "@util/serialize-error.util";
import http from "@util/http/http.util";

import scss from "./Page.module.scss"

import VALIDATION_RULES from "@root/const/VALIDATION_RULES.const";

export default function Page(): ReactNode {
  const methods = useForm<UserLogIn>();
  const { error, authenticate } = useAuth<SerializedError>({ serializeError });
  const navigate = useNavigate();

  const { formState: { isSubmitting }} = methods; 

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
    <div className={scss.page_container}>
      <FormContainer>
        <FormBody<UserLogIn> 
          {...methods } 
          onSubmit={logIn} 
          error={error?.message}>
          <FormHeader title="Log in"/>
          <InputText
            type="text"
            name="pseudonym" 
            placeholder="Unique Pseudonym"
            options={VALIDATION_RULES.USER.PSEUDONYM()}/>
          <InputText
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            options={VALIDATION_RULES.USER.PASSWORD()}/>
          <FormFooter>
            <TextButton text="Log in" type="submit" disabled={isSubmitting}/>
            <Link href="/request-reset-password">Forgot password?</Link>
          </FormFooter>
        </FormBody>
      </FormContainer>
    </div>
 );
};
