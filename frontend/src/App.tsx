import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AllPage from "./pages/AllPage";
import MainLayout from "./components/MainLayout/MainLayout";
import TaskDetail from "./pages/TaskDetail"
import AddTask from "./pages/AddTask";
import CategoryPage from "./pages/CategoryPage";
import EditTask from "./pages/EditTask";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<AllPage />} />
          <Route path="/taskdetail/:id" element={<TaskDetail />} />
          <Route path="/addtask/:categoryid" element={<AddTask />} />
          <Route path="/category/:categoryid" element={<CategoryPage />} />
          <Route path="/edittask/:taskid" element={<EditTask />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
