import React from "react";
import "./navbar.css"
import Button from "../Button/Button";

const Navbar: React.FC = () => {

  const logoutHandler = ()=>{}
  return (
    <div>
      <div className="navbar-container">
        <strong>ToDO WebApp</strong>
        <div>
          <Button text="Logout" handler={logoutHandler} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
