import React, { useContext } from "react";
import "./styles/allpage.css";
import Task from "../components/Task/Task";
import { AppContext } from "../Context/appContext";
import ICategory from "../Interfaces/categoryInterface";

const AllPage: React.FC = () => {
  const colors: string[] = ["gray", "blue", "green", "brown"];
  const context = useContext(AppContext);
  if (!context) {
    return <div>Loading.........</div>;
  }
  console.log(context.state);
  let colorIndex: number = 0;
  return (
    <div className="all-page">
      <div className="all-page-inner">
        {context.state.task.map((task) => {
          const color = colors[colorIndex % colors.length];
          colorIndex++;
          const category: ICategory | undefined = context.state.categories.find(
            (category) => category._id === task.category
          );
          return (
            <Task
              key={task._id}
              color={color}
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
