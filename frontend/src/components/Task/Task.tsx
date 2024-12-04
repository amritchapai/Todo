import React, { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
// import { SiTicktick } from 'react-icons/si';
import "./task.css";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ITask from "../../Interfaces/taskInterface";
import { SiTicktick } from "react-icons/si";

interface taskProps {
  color: string;
  task: ITask
  category: string | undefined
}

const Task: React.FC<taskProps> = ({ color, task, category}) => {
  const outsideClick = useRef<HTMLDivElement | null>(null)
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const navigate = useNavigate();

  const deadline:string = task.deadline.split("T")[0]
  const taskClickHandler = (): void => {
    navigate(`/taskdetail/${task._id}`, {
      state: {
        color: color,
      },
    });
  };

  const functionOpenOption = (e: React.MouseEvent<HTMLDivElement>):void=>{
      e.stopPropagation();
      setOpenOptions(true);
  }

  useEffect(()=>{
    const clickHandle = (e:MouseEvent)=>{
        if(outsideClick.current && !outsideClick.current.contains(e.target as Node)){
          setOpenOptions(false)
        }
    };
    document.addEventListener("mousedown", clickHandle);
    return ()=>{
        document.removeEventListener("mousedown", clickHandle)
      }
    
  },[])

  return (
    <div className={`task-container ${color}`} onClick={taskClickHandler}>
      <div className="task-header">
        <div className="task-header-inner">
          <span> {task.title}</span>
          <div className="vertical-dots">
            <div onClick={functionOpenOption}>
              <BsThreeDotsVertical size={18} />
            </div>
            {openOptions && (
              <div className="task-options" ref={outsideClick}>
                <div className="edit-div">
                  <FaEdit size={20} />
                  <span className="delete">Edit</span>
                </div>
                <div className="delete-div">
                  <MdDeleteForever size={20} />
                  <span className="delete">Delete</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="task-inner-header">
          <span className="inner-text">{category}</span>
          <span className="inner-text">{deadline}</span>

          {task.completed ? <SiTicktick size={20} /> : <FaRegCircle size={20}/>}
        </div>
      </div>
      <hr />
      <div className="task-body">
        {task.description}
      </div>
    </div>
  );
};

export default Task;
