import React, { useContext, useEffect } from "react";
import Nav from "../navbar/Nav";
// import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import { UserToken } from "../context/userToken";
export default function Layout() {
  let { setToken } = useContext(UserToken);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className="container">
        <Outlet />
       
      </div>
    </div>
  );
}
