import type { ReactNode } from "react";
import type { SomeInputsProps } from "../Page.type";

import { Fragment } from "react";

import InputText from "@ui/Input-Text/Input-Text.component";

export default function SomeInputs({ url }: SomeInputsProps): ReactNode {
  switch(url) {
    case "/user/request-confirm-email":
      return(
        <InputText
          name="email"
          type="email"
          placeholder="E - mail"
          autoComplete="email"
          options={{
            required: "E - mail is required!",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "E - mail is not valid!" }
          }}/>
      );
    case "/user/request-reset-password":
      return(
        <Fragment>
          <InputText
            name="email"
            type="email"
            placeholder="E - mail"
            autoComplete="email"
            options={{
              required: "E - mail is required!",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "E - mail is not valid!" }
            }}/>
          <InputText
            type="text"
            name="pseudonym"
            placeholder="Unique Pseudonym"
            autoComplete="username"
            options={{
              required: "Pseudonym is requierd!",
              minLength: { value: 1, message: "Pseudonym is to short!" },
              maxLength: { value: 32, message: "Pseudonym is to long!" },
            }}/>
        </Fragment>
      );
  }
};
