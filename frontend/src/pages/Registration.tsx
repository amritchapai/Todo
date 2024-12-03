import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./styles/registration.css";
import axios, { AxiosError } from "axios";
import { useState } from "react";
const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(user);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      // console.log(user);
      const response = await axios.post(
        "http://localhost:8080/api/signup",
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
        if (response.data.success) navigate("/login");
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
        setSuccess(false);
      } else {
        setMessage("An unexpected error occurred."); // Handle network errors
        setSuccess(false);
      }

      setTimeout(() => {
        setMessage(null);
      }, 1500);
    }
  };
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="main-container">
          <h1>Register to ToDo WebApp</h1>
          <form className="form" method="post">
            <label className="label">
              Name
              <input
                className="input"
                type="string"
                name="name"
                value={user.name}
                onChange={changeEventHandler}
                autoComplete="name"
              />
            </label>
            <label className="label">
              Email
              <input
                className="input"
                type="email"
                name="email"
                value={user.email}
                onChange={changeEventHandler}
                autoComplete="email"
              />
            </label>
            <label className="label">
              Password
              <input
                className="input"
                type="password"
                name="password"
                value={user.password}
                onChange={changeEventHandler}
                autoComplete="new-password"
              />
            </label>
            <Button handler={registerHandler} text="Register" />
            <p className="">
              <Link to="/login">Already registered? Login</Link>
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

export default Registration;
