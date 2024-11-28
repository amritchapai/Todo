import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Login from "./pages/Login";

const App:React.FC = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
