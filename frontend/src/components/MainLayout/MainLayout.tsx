import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import "./mainlayout.css"

const MainLayout:React.FC = () => {
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

export default MainLayout