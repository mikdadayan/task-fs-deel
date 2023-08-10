import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layout = ({ children, profile, setProfile }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar profile={profile} setProfile={setProfile} />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
