import React from 'react'
import "./login.css"
import Button from '../components/Button/Button';



const Login:React.FC = () => {
    const loginHandler = (): void=> {

    };
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="main-container">
          <h1>Login to ToDo WebApp</h1>
          <form className='form' method="post">
            <label className='label'>Email</label>
            <input className="input" type="email" />
            <label className='label'>Password</label>
            <input className="input" type="password" />
            <Button handler={loginHandler} />
            <p className="">Need to register? Register here.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login