import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
// Import your sidebar component

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar /> {/* Sidebar appears on all pages */}
      <div className="content p-3 w-100">
        <Outlet /> {/* Render child components here */}
      </div>
    </div>
  );
};

export default Layout;
