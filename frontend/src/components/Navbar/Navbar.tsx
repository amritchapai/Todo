import React from "react";
import "./navbar.css";
import Button from "../Button/Button";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected Error Occurred");
      }
    }
  };
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
