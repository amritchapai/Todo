import React, { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
// import { SiTicktick } from 'react-icons/si';
import "./task.css";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface taskProps {
  color: string;
}

const Task: React.FC<taskProps> = ({ color }) => {
  const outsideClick = useRef<HTMLDivElement | null>(null)
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const navigate = useNavigate();

  const taskClickHandler = (): void => {
    navigate("/taskdetail", {
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
          <span> title</span>
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
          <span className="inner-text">Category</span>
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
};

export default Task;
