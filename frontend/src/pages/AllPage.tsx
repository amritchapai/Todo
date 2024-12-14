import React, { useContext } from "react";
import "./styles/allpage.css";
import Task from "../components/Task/Task";
import { AppContext } from "../Context/appContext";
import ICategory from "../Interfaces/categoryInterface";

interface colors {
  [key: string]: string;
}

const AllPage: React.FC = () => {
  const colors: colors = {
    High:"gray", 
    Medium: "blue", 
    Low: "green"
  };
  const context = useContext(AppContext);
  if (!context) {
    return <div>Loading.........</div>;
  }
  console.log(context.state);
  return (
    <div className="all-page">
      <div className="all-page-inner">
        {context.state.task.map((task) => {
          const category: ICategory | undefined = context.state.categories.find(
            (category) => category._id === task.category
          );
          return (
            <Task
              key={task._id}
              color={colors[task.priority]}
              task={task}
              category={category?.categoryName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllPage;
