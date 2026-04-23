import { Component, ReactNode, ErrorInfo } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface Props {
  children: ReactNode;
}

interface State {
  error: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
    error: false,
  };

  // static getDerivedStateFromError(error: Error) {
  //     return { error: true };
  // }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something is wrong</h2>
          <p>Try to reload the page or come back later</p>
          <ErrorMessage />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
