import { Outlet } from "react-router-dom";
import Background from "./components/Background";

const Layout = () => {
  return (
    <div className="relative w-full min-h-screen">
      <Background />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
