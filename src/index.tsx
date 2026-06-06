import "@scss/root.scss";

import type { ReactNode } from "react";

import { Fragment, lazy, Suspense } from "react";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";

import store from "./reducers/store";

import ErrorBoundary from "@component/Error-Boundary/Error-Boundary.component";
import Header from "@component/Header/Header.component";
import AuthProvider from "@service/auth/components/Auth-Provider/Auth-Provider.component";
import AuthRoute from "./services/auth/components/Auth-Route/Auth-Route.component";
import CommonSkeleton from "./ui/Common-Skeleton/Common-Skeleton.component";
import { NotificationToastRenderer } from "./features/notification-toast/notification-toast.feature";
import { ModalsRenderer } from "@feature/modals-manager/modals-manager.feature";

import { Routes, initRouteComponents } from "@hook/use-react-router/use-react-router.hook";

import http from "./utils/http/http.util";
import authorize from "./utils/authorize.util";

export const { Route, Link } = initRouteComponents<string>();

const Home = lazy(() => import("@page/Home/Page.page"));
const LogUp = lazy(() => import("@page/Log-Up/Page.page"));
const LogIn = lazy(() => import("@page/Log-In/Page.page"));
const FileViewer = lazy(() => import("@page/File-Viewer/Page.page"));
const RequestResetPassword = lazy(() => import("@page/Request-Reset-Password/Page.page"));
const ResetPassword = lazy(() => import("@page/Reset-Password/Page.page"));
const RequestConfirmEmail = lazy(() => import("@page/Request-Confirm-Email/Page.page"));

http.config({ base: "http://localhost:4000" });

function App(): ReactNode {
  return(
    <Fragment>
      <ModalsRenderer/>
      <NotificationToastRenderer/>
      <Route path="/log-up">
        <main>
          <Suspense fallback={<CommonSkeleton/>}>
            <LogUp/>
          </Suspense>
        </main>
      </Route>
      <Route path="/log-in">
        <main>
          <Suspense fallback={<CommonSkeleton/>}>
            <LogIn/>
          </Suspense>
        </main>
      </Route>
      <Route path="/item/:id">
        <AuthRoute onEnter={authorize}>
          <main>
            <Suspense fallback={<CommonSkeleton/>}>
              <FileViewer/>
            </Suspense>
          </main>
        </AuthRoute>
      </Route>
      <Route path="/">
        <AuthRoute onEnter={authorize}>
          <Header/>
          <main>
            <Suspense fallback={<CommonSkeleton/>}>
              <Home/>
            </Suspense>
          </main>
        </AuthRoute>
      </Route>
      <Route path="/request-reset-password">
        <main>
          <Suspense fallback={<CommonSkeleton/>}>
            <RequestResetPassword/>
          </Suspense>
        </main>
      </Route>
      <Route path="/request-confirm-email">
        <main>
          <Suspense fallback={<CommonSkeleton/>}>
            <RequestConfirmEmail/>
          </Suspense>
        </main>
      </Route>
      <Route path="/reset-password">
        <main>
          <Suspense fallback={<CommonSkeleton/>}>
            <ResetPassword/>
          </Suspense>
        </main>
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
