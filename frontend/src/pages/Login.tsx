import React, { useState } from "react";
import "./styles/login.css";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const Login: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

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
      setMessage(response.data.message);
      setSuccess(response.data.success);
      setTimeout(() => {
        setMessage(null);
        setSuccess(null);
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
        setSuccess(error.response?.data.success);
      } else {
        setMessage("An Unexpected error occured");
        setSuccess(false);
      }
      setTimeout(() => {
        setMessage(null);
        setSuccess(null);
      }, 1500);
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
      <div className={`error-message ${success} `}>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
