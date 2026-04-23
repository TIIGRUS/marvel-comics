import { ReactElement } from "react";
import { AsyncStatus } from "../types";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Skeleton from "../components/Skeleton/Skeleton";

interface SetContentProps {
  process: AsyncStatus;
  Component: ReactElement;
  ComponentError?: ReactElement;
  paginationLoading?: boolean;
}

const setContent = ({
  process,
  Component,
  ComponentError,
  paginationLoading,
}: SetContentProps): ReactElement => {
  switch (process) {
    case "waiting":
      return paginationLoading ? <Spinner /> : <Skeleton />;

    case "loading":
      return paginationLoading ? Component : <Spinner />;

    case "confirmed":
      return Component;

    case "error":
      return ComponentError ? ComponentError : <ErrorMessage />;

    default:
      throw new Error(`Unexpected process state: ${process}`);
  }
};

export default setContent;
