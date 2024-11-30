import React from 'react'
import Button from '../components/Button/Button'
import { Link } from 'react-router-dom'
import "./styles/registration.css"
const Registration: React.FC = () => {

    const registerHandler = ():void =>{

    }
    return (
      <div className="outer-container">
        <div className="inner-container">
          <div className="main-container">
            <h1>Register to ToDo WebApp</h1>
            <form className="form" method="post">
              <label className="label">Name</label>
              <input className="input" type="string" />
              <label className="label">Email</label>
              <input className="input" type="email" />
              <label className="label">Password</label>
              <input className="input" type="password" />
              <Button handler={registerHandler} text="Register" />
              <p className="">
                <Link  to="/login">Already registered? Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Registration