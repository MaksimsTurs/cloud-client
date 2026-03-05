// import scss from "./Error-Boundary.module.scss";

import { Fragment, Component } from "react";

import type { ReactNode } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./Error-Boundary.component.type";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  };

  public componentDidCatch(error: Error): void {
    console.info(`Error: ${error.message}`);
  };

  render(): ReactNode {
    return(
      <Fragment>{this.state.hasError ? this.props.fallbackComponent : this.props.children}</Fragment>
    )
  };
};

export default ErrorBoundary;
