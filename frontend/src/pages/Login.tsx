import React, { useEffect, useState } from "react";
import "./styles/login.css";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "../Context/authContext";

const Login: React.FC = () => {
  const { isAuthenticated, setAuthentication } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      console.log(user);
      const response = await axios.post(
        "http://localhost:8080/api/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setAuthentication(true);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error occured");
      }
    }
  };
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="main-container">
          <h1>Login to ToDo WebApp</h1>
          <form className="form" method="post">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={user.email}
              onChange={changeEventHandler}
            />
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={user.password}
              onChange={changeEventHandler}
            />
            <Button handler={loginHandler} text="Login" />
            <p className="">
              <Link className="link" to="/register">
                Need to register? Register here.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
