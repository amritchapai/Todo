import React, { useContext, useEffect } from "react";
import "./navbar.css";
import Button from "../Button/Button";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AppContext } from "../../Context/appContext";
import { useAuth } from "../../Context/authContext";

const Navbar: React.FC = () => {
  const { setAuthentication } = useAuth();
  const context = useContext(AppContext);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/getallcategory",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        context?.dispatch({
          type: "set_category",
          payload: response.data.data,
        });
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      console.log("fetching task");
      const response = await axios.get("http://localhost:8080/api/getalltask", {
        withCredentials: true,
      });
      console.log(response.data.data);
      if (response.data.success) {
        context?.dispatch({ type: "set_tasks", payload: response.data.data });
      }
    };
    fetchTask();
  }, []);

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
        context?.dispatch({ type: "clear_state", payload: null });
        setAuthentication(false);
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
