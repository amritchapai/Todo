import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AllPage from "./pages/AllPage";
import MainLayout from "./components/MainLayout/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<AllPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
