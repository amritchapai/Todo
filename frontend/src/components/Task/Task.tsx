import React from 'react'
import { FaRegCircle } from 'react-icons/fa';
// import { SiTicktick } from 'react-icons/si';
import "./task.css"
import { useNavigate } from 'react-router-dom';

interface taskProps{
    color: string
}

const Task:React.FC <taskProps> = ({color}) => {

    const navigate = useNavigate();

    const taskClickHandler = ():void =>{
        navigate("/taskdetail", {
          state:{
            color: color,
          }
        })
    }

  return (
    <div className={`task-container ${color}`} onClick={taskClickHandler}>
      <div className="task-header">
        <span> title</span>
        <div className="task-inner-header">
          <span className="inner-text">Category</span>
          <a className="link-edit" href="#">
            <span>Edit</span>
          </a>
          <span className="inner-text">Deadline:</span>
          {/* <SiTicktick size={20}/> */}
          <FaRegCircle />
        </div>
      </div>
      <hr />
      <div className="task-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur harum
        libero dolore itaque repudiandae distinctio voluptatum cupiditate vel
        consectetur dolorum?
      </div>
    </div>
  );
}

export default Task