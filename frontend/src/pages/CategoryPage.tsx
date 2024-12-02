import React from 'react'
import Task from '../components/Task/Task';
import { IoAddCircleSharp } from "react-icons/io5";
import "./styles/categorypage.css"
import "./styles/allpage.css"

const addTaskHandler = ()=>{

}

const CategoryPage:React.FC = () => {
  const colors: string[] = ["gray", "blue", "green", "brown"];
  let colorIndex: number = 0;
  const task = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 22, 34];
  return (
    <div className="all-page">
      {task.map((index) => {
        const color = colors[colorIndex % colors.length];
        colorIndex++;
        return <Task key={index} color={color} />;
      })}
        <button className='add-task-button' onClick={addTaskHandler}> <div className='add-task-button-div'>
            <IoAddCircleSharp size={30}/>
            <span>Add Task</span>
            </div>
            </button>
    </div>
  );
}

export default CategoryPage