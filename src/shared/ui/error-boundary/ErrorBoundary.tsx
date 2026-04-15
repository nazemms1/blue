import { Component, type ComponentType, type ErrorInfo, type ReactNode } from "react";

export interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent: ComponentType<ErrorFallbackProps>;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (error instanceof Error) {
      return { error };
    }
    return { error: new Error("Unknown application error") };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Keep the primitive framework-agnostic. Integrators can wire telemetry externally.
    void _error;
    void _errorInfo;
  }

  private handleReset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    const { error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (error) {
      return <FallbackComponent error={error} reset={this.handleReset} />;
    }

    return children;
  }
}
