import React from "react";
import "./styles/login.css";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const loginHandler = (): void => {};
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="main-container">
          <h1>Login to ToDo WebApp</h1>
          <form className="form" method="post">
            <label className="label">Email</label>
            <input className="input" type="email" />
            <label className="label">Password</label>
            <input className="input" type="password" />
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
