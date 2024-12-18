import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./mainlayout.css";
import { useAuth } from "../../Context/authContext";

const MainLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 769) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="layout-container">
      <Navbar toggle={toggleSidebar} />
      <div className="content-wrapper">
        <div className={`sidebar ${openSidebar ? "visible" : ""}`}>
          <Sidebar toggle={toggleSidebar} />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
