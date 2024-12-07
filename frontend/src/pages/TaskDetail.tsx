import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import "./styles/taskdetail.css"
import { useLocation} from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AppContext } from '../Context/appContext';
import ITask from '../Interfaces/taskInterface';
import ICategory from '../Interfaces/categoryInterface';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

interface stateElements{
  color: string
}


const TaskDetail:React.FC = () => {
  const context = useContext(AppContext);

  const location = useLocation();

  const outsideClick = useRef<HTMLDivElement | null>(null);
  const [openOptions, setOpenOptions] = useState<boolean>(false);




  const functionOpenOption = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setOpenOptions(true);
  };

  useEffect(() => {
    const clickHandle = (e: MouseEvent) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(e.target as Node)
      ) {
        setOpenOptions(false);
      }
    };
    document.addEventListener("mousedown", clickHandle);
    return () => {
      document.removeEventListener("mousedown", clickHandle);
    };
  }, []);
  if (!context) {
    return <div>Loading...</div>;
  }

  const currentLocation: string = location.pathname;
  const taskId: string = currentLocation.split("/")[2];
  const state: stateElements = location.state;
  const task:ITask|undefined = context.state.task.find((task)=> task._id === taskId);
  if(!task){
    return <div>Such task does not exist</div>
  }
  const category: ICategory|undefined = context.state.categories.find((category)=>category._id === task.category)
  return (
    <div className={`detail-container ${state?.color}`}>
      <div className="detail-header">
        <div className="detail-header-inner">
          <span>{task.title}</span>
          <div className="vertical-dots">
            <div onClick={functionOpenOption}>
              <BsThreeDotsVertical size={18} />
            </div>
            {openOptions && (
              <div className="detail-options" ref={outsideClick}>
                <div className="detail-edit-div">
                  <FaEdit size={20} />
                  <span className="detail-delete">Edit</span>
                </div>
                <div className="detail-delete-div">
                  <MdDeleteForever size={20} />
                  <span className="detail-delete">Delete</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="detail-inner-header">
          <span className="inner-text">{category?.categoryName}</span>

          {task.completed ? (
            <ImCheckboxChecked size={20} />
          ) : (
            <>
              <span className="inner-text">{task.deadline.split("T")[0]}</span>
              <ImCheckboxUnchecked size={20} />
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="detail-body">
       {task.description}
      </div>
    </div>
  );
}

export default TaskDetail