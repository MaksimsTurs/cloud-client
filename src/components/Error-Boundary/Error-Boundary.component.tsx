import type { ReactNode } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./Error-Boundary.component.type";

import scss from "./Error-Boundary.module.scss";

import { Fragment, Component } from "react";
import { BugIcon } from "lucide-react";

import Metadata from "@component/Metadata/Metadata.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  };

  public constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false 
    };
  };

  public componentDidCatch(_error: Error): void {};

  public goToHomePage(): void {
    window.open("/", "_self");
  };

  public render(): ReactNode {
    return(
      <Fragment>
        <Metadata title="Error is occur"/>
        {!this.state.hasError ? this.props.children : 
        <div className={scss.error_container}>
          <div className={scss.error_body}>
            <div className={scss.error_header}>
              <BugIcon size={32} strokeWidth={1.5}/>
              <h3>Unexpected error!</h3>
            </div>
            <div className={scss.error_information}>
              <p>Automatic report has ben sended to developer, go to the home page or try do you stuff later.</p>
              <TextButton onClick={this.goToHomePage.bind(this)} text="Go Home"/>
            </div>
          </div>
        </div>}
      </Fragment>
    )
  };
};

export default ErrorBoundary;
