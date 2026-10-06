import type { ReactNode } from "react";
import type { SomeInputsProps } from "../Page.type";

import { Fragment } from "react";

import InputText from "@ui/Input-Text/Input-Text.component";

import VALIDATION_RULES from "@root/const/VALIDATION_RULES.const";

export default function SomeInputs({ url }: SomeInputsProps): ReactNode {
  switch(url) {
    case "/user/request-confirm-email":
      return(
        <InputText
          name="email"
          type="email"
          placeholder="E - mail"
          autoComplete="email"
          options={VALIDATION_RULES.USER.EMAIL()}/>
      );
    case "/user/request-reset-password":
      return(
        <Fragment>
          <InputText
            type="text"
            name="pseudonym"
            placeholder="Unique Pseudonym"
            autoComplete="username"
            options={VALIDATION_RULES.USER.PSEUDONYM()}/>
          <InputText
            name="email"
            type="email"
            placeholder="E - mail"
            autoComplete="email"
            options={VALIDATION_RULES.USER.EMAIL()}/>
        </Fragment>
      );
  }
};
