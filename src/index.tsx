import "@scss/root.scss";

import type { ReactNode } from "react";

import { Fragment, lazy, Suspense } from "react";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";

import store from "./reducers/store";

import NotAuthenticated from "@component/Not-Authenticated/Not-Authenticated.component";
import ErrorBoundary from "@component/Error-Boundary/Error-Boundary.component";
import Header from "@component/Header/Header.component";
import AuthProvider from "@service/auth/components/Auth-Provider/Auth-Provider.component";
import AuthRoute from "./services/auth/components/Auth-Route/Auth-Route.component";
import CommonSkeleton from "./ui/Common-Skeleton/Common-Skeleton.component";
import { NotificationToastRenderer } from "./features/notification-toast/notification-toast.feature";
import { ModalsRenderer } from "@feature/modals-manager/modals-manager.feature";

import { Routes, Route } from "@hook/use-react-router/use-react-router.hook";

import http from "./utils/http/http.util";
import authorize from "./utils/authorize.util";
import generateRefreshToken from "./utils/generate-refresh-token.util";
import Metadata from "./components/Metadata/Metadata.component";

const Home = lazy(() => import("@page/Home/Page.page"));
const LogUp = lazy(() => import("@page/Log-Up/Page.page"));
const LogIn = lazy(() => import("@page/Log-In/Page.page"));
const FileViewer = lazy(() => import("@page/File-Viewer/Page.page"));
const RequestSomeEmail = lazy(() => import("@page/Request-Some-Email/Page.page"));
const ResetPassword = lazy(() => import("@page/Reset-Password/Page.page"));

http.config({ base: import.meta.env.VITE_BACKEND_URL });

function App(): ReactNode {
  return(
    <Fragment>
      <ModalsRenderer/>
      <NotificationToastRenderer/>
      <Header/>
      <main>
        <Route path="/log-up">
          <Suspense fallback={<CommonSkeleton/>}>
            <LogUp/>
          </Suspense>
        </Route>
        <Route path="/log-in">
          <Suspense fallback={<CommonSkeleton/>}>
            <LogIn/>
          </Suspense>
        </Route>
        <Route path="/item/:id">
          <AuthRoute 
            fallback={<NotAuthenticated/>}  
            loader={<CommonSkeleton/>} 
            auth={authorize}
            generateRefreshToken={generateRefreshToken}>
            <Suspense fallback={<CommonSkeleton/>}>
              <FileViewer/>
            </Suspense>
          </AuthRoute>
        </Route>
        <Route path="/">
          <AuthRoute 
            fallback={<NotAuthenticated/>}
            loader={<CommonSkeleton/>} 
            auth={authorize}
            generateRefreshToken={generateRefreshToken}>
            <Suspense fallback={<CommonSkeleton/>}>
              <Home/>
            </Suspense>
          </AuthRoute>
        </Route>
        <Route path="/request-reset-password">
          <Suspense fallback={<CommonSkeleton/>}>
            <RequestSomeEmail 
              url="/user/request-reset-password" 
              formHeader="Request Reset Password"
              metadata={
                <Metadata title="Request Reset Password"/>
              }/>
          </Suspense>
        </Route>
        <Route path="/request-confirm-email">
          <Suspense fallback={<CommonSkeleton/>}>
            <RequestSomeEmail 
              url="/user/request-confirm-email"
              formHeader="Request Confirm Email"
              metadata= {
                <Metadata title="Request Confirm Email"/>
              }/>
          </Suspense>
        </Route>
        <Route path="/reset-password">
          <Suspense fallback={<CommonSkeleton/>}>
            <ResetPassword/>
          </Suspense>
        </Route>
      </main>
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
