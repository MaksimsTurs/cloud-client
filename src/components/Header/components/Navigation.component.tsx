import type { SerializedError, User } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";
import type { ReactNode } from "react";

import scss from "../scss/Navigation.module.scss";

import { usePath, useNavigate } from "@hook/use-react-router/use-react-router.hook";
import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";
import { useAuth, useAuthIsAuthorized, useUser, useWithAuth } from "@service/auth/auth.service";
import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import IconButton from "@ui/Icon-Button/Icon-Button.component";

import { 
  ArrowLeftIcon, 
  LogOutIcon, 
  MailWarningIcon, 
  UserPlus2Icon, 
  UserRoundKeyIcon, 
} from "lucide-react";

import { Fragment } from "react/jsx-runtime";

import serializeError from "@util/serialize-error.util";
import http from "@util/http/http.util";
import generateRefreshToken from "@util/generate-refresh-token.util";

export default function Navigation(): ReactNode {
  const navigate = useNavigate();
  const path = usePath();
  const toast = useNotificationToastActions();
  const feHistory = useFileExplorerHistory();
  const isAuthorized = useAuthIsAuthorized();
  const user = useUser<User>();
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const { logout } = useAuth<SerializedError>({ serializeError });

  const goTo = (path: string): void => {
    navigate(path);
  };

  const goBack = async (): Promise<void> => {
    feHistory.close(-1);
  };

  const logoutUser = async (): Promise<void> => {
    const result = await withAuth({
      generateRefreshToken,
      apiRequest: async () => {
        await logout(async () => {
          return await http.get<UseAuthEndpointResponse>("/user/log-out", { credentials: "include" });
        });
      } 
    });

    if(result.getError()) {
      toast.add("error", result.getError()!.message);
    } else {
      navigate("/");
    }
  };

  return(
    <nav className={scss.header_nav_container}>
      <IconButton 
        onClick={goBack} 
        disabled={feHistory.isRoot || path != "/"}>
        <ArrowLeftIcon/>
      </IconButton>
      {isAuthorized ?
      <Fragment>
        {!user.is_verified ?
        <IconButton 
          role="button" 
          aria-label="Email is not verified"
          onClick={() => goTo("/request-confirm-email")}>
          <MailWarningIcon/>
        </IconButton> : null}
        <IconButton 
          onClick={logoutUser} 
          role="button" 
          aria-label="Log out">
          <LogOutIcon/>
        </IconButton>
      </Fragment> :
      <Fragment>
        <IconButton 
          role="button" 
          aria-label="Log up"
          onClick={() => goTo("/log-up")}>
          <UserPlus2Icon/>
        </IconButton>
        <IconButton 
          role="button" 
          aria-label="Log in"
          onClick={() => goTo("/log-in")}>
          <UserRoundKeyIcon/>
        </IconButton>
      </Fragment>}
    </nav>
  );
};
