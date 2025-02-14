import { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) {
    //     return { error: true };
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);

        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <h2>Something is wrong</h2>
                    <p>Try to reload the page or come back later</p>
                    <ErrorMessage />
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;