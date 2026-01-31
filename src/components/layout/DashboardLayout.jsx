import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

function DashboardLayout({ children, activeMenu, setActiveMenu }) {
  const { user } = useContext(userContext);
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
