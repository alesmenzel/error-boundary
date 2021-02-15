import { Component } from "react";
import type { ReactNode } from "react";

export type Info = { componentStack: string }

export type FallbackData = {
  error: Error;
  retry: () => void;
}

export type Fallback = ReactNode | ((data: FallbackData) => ReactNode)

export type Props = {
  fallback: Fallback;
  onError?: (err: Error, info: Info) => void;
}

export type State = {
  error: Error | null;
}

function render(component: Fallback, props: FallbackData): ReactNode {
  // Render prop
  if (typeof component === 'function') {
    return component(props)
  }
  return component
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { error: null };

    this.retry = this.retry.bind(this)
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(err: Error, info: Info): void {
    const { onError } = this.props;
    if (onError) onError(err, info);
  }

  retry(): void {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error) {
      return render(fallback, { error, retry: this.retry })
    }

    return children;
  }
}

export default ErrorBoundary;
