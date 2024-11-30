import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Navbar from "./components/Navbar/Navbar";

const App:React.FC = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
