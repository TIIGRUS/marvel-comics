import { Outlet } from "react-router-dom";
import { ComicsProvider } from "../contexts/ComicsContext";

const ComicsLayout = () => {
  return (
    <ComicsProvider>
      <Outlet></Outlet>
    </ComicsProvider>
  );
};

export default ComicsLayout;
