import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Skeleton from "../components/Skeleton/Skeleton";

const setContent = ({ process, Component, ComponentError, paginationLoading }) => {
    switch (process) {
        case 'waiting':
            return paginationLoading ? <Spinner /> : <Skeleton />;

        case 'loading':
            return paginationLoading ? Component : <Spinner />;

        case 'confirmed':
            return Component;

        case 'error':
            return ComponentError ? ComponentError : <ErrorMessage />;

        default:
            throw new Error(`Unexpected process state: ${process}`);
    }
}

export default setContent;