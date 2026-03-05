import "@scss/root.scss";

import type { ReactNode } from "react";

import { Fragment, lazy, Suspense } from "react";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";

import store from "./reducers/store";

import ErrorBoundary from "@component/Error-Boundary/Error-Boundary.component";
import Header from "@component/Header/Header.component";
import { NotificationToastRenderer } from "./features/notification-toast/notification-toast.feature";
import { ModalsRenderer } from "@feature/modals-manager/modals-manager.feature";
import AuthProvider from "@service/auth/components/Auth-Provider/Auth-Provider.component";

import { Routes, initRouteComponents } from "@hook/use-react-router/use-react-router.hook";

import fetcher from "./utils/fetcher/fetcher.util";

export const { Route, Link } = initRouteComponents<string>();

const Home = lazy(() => import("@page/Home/Page.page"));
const LogUp = lazy(() => import("@page/Log-Up/Page.page"));
const LogIn = lazy(() => import("@page/Log-In/Page.page"));
const FileViewer = lazy(() => import("@page/File-Viewer/Page.page"));

function App(): ReactNode {
  fetcher.base = "http://localhost:4000";

  return(
    <Fragment>
      <ModalsRenderer/>
      <NotificationToastRenderer/>
      <Route path="/item/:id">
        <Suspense>
          <FileViewer/>
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense>
          <Home/>
        </Suspense>
      </Route>
      <Route path="/log-up">
        <Suspense>
          <LogUp/>
        </Suspense>
      </Route>
      <Route path="/log-in">
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
            <Header/>
            <App/>
          </Routes>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );  
