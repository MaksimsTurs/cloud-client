import type { SerializedError, User } from "@root/global.type";
import type { UseAuthEndpointResponse } from "@service/auth/hooks/use-auth.type";
import type { ReactNode } from "react";

import scss from "../scss/Navigation.module.scss";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";
import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";
import { useAuth, useAuthIsAuthorized, useUser, useWithAuth } from "@service/auth/auth.service";

import { Link } from "@hook/use-react-router/use-react-router.hook";
import HybrideButton from "@ui/Icon-Button/Icon-Button.component";

import { 
  DatabaseArrowDownIcon,
  HouseIcon,
  InfoIcon,
  LogOutIcon, 
  MailPenIcon, 
  MailWarningIcon, 
  TrashIcon, 
  UserKeyIcon, 
  UserPlusIcon, 
} from "lucide-react";

import { Fragment } from "react";

import serializeError from "@util/serialize-error.util";
import http from "@util/http/http.util";
import generateRefreshToken from "@util/generate-refresh-token.util";

export default function Navigation(): ReactNode {
  const navigate = useNavigate();
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const { logout } = useAuth<SerializedError>({ serializeError });
  const toast = useNotificationToastActions();
  const isAuthorized: boolean = useAuthIsAuthorized();
  const user: User = useUser<User>();

  const removeMe = async (): Promise<void> => {
    const result = await withAuth({
      generateRefreshToken,
      apiRequest: async () => {
        await http.get("/user/remove-me", { credentials: "include" });
      } 
    });

    if(result.getError()) {
      toast.add("error", result.getError()!.message);
    } else {
      navigate("/");
    }   
  };

  const downloadMyData = async (): Promise<void> => {
    const result = await withAuth({
      generateRefreshToken,
      apiRequest: async () => {
        const blob: Blob = await http.get<Blob>("/user/download-my-data", { credentials: "include", processAs: "blob" });
        const url: string = URL.createObjectURL(blob);
        const link: HTMLAnchorElement = document.createElement("a");

        link.href = url;
        link.download = "Data.json";
        link.click();

        URL.revokeObjectURL(url);
      } 
    });

    if(result.getError()) {
      toast.add("error", result.getError()!.message);
    }
  };

  const logoutUser = async (): Promise<void> => {
    const result = await withAuth({
      generateRefreshToken,
      apiRequest: async () => {
        await logout(async () => await http.get<UseAuthEndpointResponse>("/user/log-out", { credentials: "include" }));
      } 
    });

    if(result.getError()) {
      toast.add("error", result.getError()!.message);
    } else {
      navigate("/");
    }
  };

  return(
    <nav className={scss.nav_container}>
      <Link href="/">
        <HybrideButton icon={<HouseIcon/>}/>
      </Link>
     <Link href="/write-us">
      <HybrideButton icon={<MailPenIcon/>}/>
     </Link>
      {isAuthorized ?
      <Fragment>
        {!user.is_verified ?
        <Link href="/request-confirm-email">
          <HybrideButton icon={<MailWarningIcon/>}/>
        </Link> : null}
        <HybrideButton onClick={logoutUser} icon={<LogOutIcon/>}/>
        <HybrideButton onClick={downloadMyData} text="Get my data" icon={<DatabaseArrowDownIcon/>}/>
        <HybrideButton onClick={removeMe} text="Remove me" icon={<TrashIcon/>}/>
      </Fragment> :
      <Fragment>
        <Link href="/log-up">
          <HybrideButton icon={<UserPlusIcon/>} text="Log up"/>
        </Link>
        <Link href="/log-in">
          <HybrideButton icon={<UserKeyIcon/>} text="Log in"/>
        </Link>
        <Link href="/about-us">
          <HybrideButton icon={<InfoIcon/>}/>
        </Link>
     </Fragment>}
   </nav>
  );
};
