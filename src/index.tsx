import "@scss/root.scss";

import type { ReactNode } from "react";
import type { UseAuthEndpointResponse } from "./services/auth/hooks/use-auth.type";

import { Fragment, lazy, Suspense } from "react";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";

import store from "./reducers/store";

import ErrorBoundary from "@component/Error-Boundary/Error-Boundary.component";
import Header from "@component/Header/Header.component";
import AuthProvider from "@service/auth/components/Auth-Provider/Auth-Provider.component";
import AuthRoute from "./services/auth/components/Auth-Route/Auth-Route.component";
import { NotificationToastRenderer } from "./features/notification-toast/notification-toast.feature";
import { ModalsRenderer } from "@feature/modals-manager/modals-manager.feature";

import { Routes, initRouteComponents } from "@hook/use-react-router/use-react-router.hook";

import http from "./utils/http/http.util";

export const { Route, Link } = initRouteComponents<string>();

const Home = lazy(() => import("@page/Home/Page.page"));
const LogUp = lazy(() => import("@page/Log-Up/Page.page"));
const LogIn = lazy(() => import("@page/Log-In/Page.page"));
const FileViewer = lazy(() => import("@page/File-Viewer/Page.page"));
const RequestResetPassword = lazy(() => import("@page/Request-Reset-Password/Page.page"));
const ResetPassword = lazy(() => import("@page/Reset-Password/Page.page"));
const RequestConfirmEmail = lazy(() => import("@page/Request-Confirm-Email/Page.page"));

http.config({ base: "http://localhost:4000" });

async function authorize(): Promise<UseAuthEndpointResponse> {
  return await http.get("/user/init", { credentials: "include" });
};

function App(): ReactNode {
  return(
    <Fragment>
      <ModalsRenderer/>
      <NotificationToastRenderer/>
      <Route path="/item/:id">
        <AuthRoute authorize={authorize}>
          <Header/>
          <Suspense>
            <FileViewer/>
          </Suspense>
        </AuthRoute>
      </Route>
      <Route path="/">
        <AuthRoute authorize={authorize}>
          <Header/>
          <Suspense>
            <Home/>
          </Suspense>
        </AuthRoute>
      </Route>
      <Route path="/request-reset-password">
        <Header/>
        <Suspense>
          <RequestResetPassword/>
        </Suspense>
      </Route>
      <Route path="/request-confirm-email">
        <Header/>
        <Suspense>
          <RequestConfirmEmail/>
        </Suspense>
      </Route>
      <Route path="/reset-password">
        <Header/>
        <Suspense>
          <ResetPassword/>
        </Suspense>
      </Route>
      <Route path="/log-up">
        <Header/>
        <Suspense>
          <LogUp/>
        </Suspense>
      </Route>
      <Route path="/log-in">
        <Header/>
        <Suspense>
          <LogIn/>
        </Suspense>
      </Route>
    </Fragment>
  );
};

createRoot(document.body)
  .render(
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <App/>
          </Routes>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );  
