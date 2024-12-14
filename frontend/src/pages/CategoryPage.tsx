import React, { useContext } from "react";
import Task from "../components/Task/Task";
import { IoAddCircleSharp } from "react-icons/io5";
import "./styles/categorypage.css";
import "./styles/allpage.css";
import { AppContext } from "../Context/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import ICategory from "../Interfaces/categoryInterface";

interface colors {
  [key: string]: string;
}

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const colors: colors = {
    High: "gray",
    Medium: "blue",
    Low: "green",
  };

  if (!context) {
    return <div>Loading......</div>;
  }

  const categoryId: string = location.pathname.split("/")[2];

  const category: ICategory | undefined = context.state.categories.find(
    (category) => category._id === categoryId
  );
  if (!category) {
    return <div>Category doesnt exist. You need to create first</div>;
  }

  const addTaskHandler = (): void => {
    navigate(`/addtask/${category._id}`);
  };
  return (
    <div className="all-page">
      <div className="all-page-inner">
        {category.tasks.map((task) => {
          return (
            <Task
              key={task._id}
              task={task}
              category={category.categoryName}
              color={colors[task.priority]}
            />
          );
        })}
      </div>
      <button className="add-task-button" onClick={addTaskHandler}>
        {" "}
        <div className="add-task-button-div">
          <IoAddCircleSharp size={30} />
          <span>Add Task</span>
        </div>
      </button>
    </div>
  );
};

export default CategoryPage;
