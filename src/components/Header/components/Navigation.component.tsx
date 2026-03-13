import type { SerializedError } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";
import type { ReactNode } from "react";

import scss from "../scss/Navigation.module.scss";

import { usePath, useNavigate } from "@hook/use-react-router/use-react-router.hook";
import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";
import { useAuth, useAuthIsAuthorized, useWithAuth } from "@service/auth/auth.service";
import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import IconButton from "@ui/Icon-Button/Icon-Button.component";

import { Link } from "@hook/use-react-router/use-react-router.hook";

import { 
  ArrowLeftIcon, 
  UserCheck2Icon, 
  UserPlus2Icon, 
  UserRoundXIcon
} from "lucide-react";

import { Fragment } from "react/jsx-runtime";

import serializeError from "@util/serialize-error.util";
import http from "@util/http/http.util";
import generateRefreshToken from "@util/refresh-user-refresh-token.util";

export default function Navigation(): ReactNode {
  const navigate = useNavigate();
  const path = usePath();
  const toast = useNotificationToastActions();
  const feHistory = useFileExplorerHistory();
  const isAuthorized = useAuthIsAuthorized();
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const { logout } = useAuth<SerializedError>({ serializeError });

  const goBack = async (): Promise<void> => {
    if(path !== "/") {
      navigate(-1);
    } else {
      feHistory.close(-1);
    }
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
      <IconButton onClick={goBack} disabled={!feHistory.parent && path === "/"}>
        <ArrowLeftIcon/>
      </IconButton>
      {isAuthorized ?
      <IconButton onClick={logoutUser}>
        <UserRoundXIcon/> 
      </IconButton> :
      <Fragment>
        <Link href="/log-up">
          <IconButton>
          <UserPlus2Icon/>
          </IconButton>
        </Link>
        <Link href="/log-in">
          <IconButton>
            <UserCheck2Icon/>
          </IconButton>
        </Link>
      </Fragment>}
    </nav>
  );
};
