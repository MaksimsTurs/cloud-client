import type { SerializedError } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hook/use-auth.type";

import scss from "../scss/Navigation.module.scss";

import useNavigate from "@hook/use-react-router/use-navigate.hook";
import usePath from "@hook/use-react-router/use-path.hook";
import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";
import { useAuth, useWithAuth } from "@service/auth/auth.service";
import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import { Link } from "@root/index";

import Button from "@ui/Button/Button.component";

import { 
  ArrowLeftIcon, 
  LogOutIcon, 
  UserCheck2Icon, 
  UserPlus2Icon 
} from "lucide-react";

import { Fragment } from "react/jsx-runtime";

import serializeError from "@util/serialize-error.util";
import fetcher from "@util/fetcher/fetcher.util";
import refreshUserRefreshToken from "@util/refresh-user-refresh-token.util";

import NOTIFICATION_TOAST_TYPES from "@feature/notification-toast/const/NOTIFICATION-TOAST-TYPES.const";

export default function Navigation() {
  const navigate = useNavigate();
  const path = usePath();
  const notificationToast = useNotificationToastActions();
  const withAuth = useWithAuth<SerializedError>({ serializeError })
  const { logout, isAuthorized } = useAuth<SerializedError>({ serializeError });
  const feHistory = useFileExplorerHistory();

  const goBack = async (): Promise<void> => {
    if(path !== "/") {
      navigate(-1);
    } else {
      feHistory.close(-1);
    }
  };

  const logoutUser = async (): Promise<void> => {
    const [_, error] = await withAuth({
      refreshRefreshToken: async () => {
        return await refreshUserRefreshToken()
      },
      apiRequest: async () => {
        const error = await logout(async () => {
          const { data, error } = await fetcher.get<UseAuthEndpointResponse>("/user/log-out", { credentials: "include" });

          if(error) {
            throw error;
          }

          return data;
        });

        if(error) {
          throw error
        }
      } 
    });

    if(error) {
      notificationToast.add({ type: NOTIFICATION_TOAST_TYPES.ERROR, message: error.message });
    } else {
      navigate("/");
    }
  };


  return(
    <nav className={scss.header_nav_container}>
      <Button onClick={goBack}>
        <ArrowLeftIcon strokeWidth={1} size={20}/>
      </Button>
      {isAuthorized ?
      <Button onClick={logoutUser}>
        <LogOutIcon strokeWidth={1} size={20}/> 
      </Button> :
      <Fragment>
        <Link href="/log-up">
          <Button>
            <UserPlus2Icon strokeWidth={1} size={20}/>
          </Button>
        </Link>
        <Link href="/log-in">
          <Button>
            <UserCheck2Icon strokeWidth={1} size={20}/>
          </Button>
        </Link>
      </Fragment>}
    </nav>
  );
};
