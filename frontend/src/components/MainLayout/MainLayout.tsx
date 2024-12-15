import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./mainlayout.css";
import { useAuth } from "../../Context/authContext";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
    return (
      <div className="layout-container">
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
  

export default MainLayout;
