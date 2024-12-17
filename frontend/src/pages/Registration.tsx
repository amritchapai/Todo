import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./styles/registration.css";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
const Registration: React.FC = () => {
  const navigate = useNavigate();

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
        "https://todo-s0jh.onrender.com/api/signup",
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
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message);
      else {
        toast.error("Unexpected error occured");
      }
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
    </div>
  );
};

export default Registration;
