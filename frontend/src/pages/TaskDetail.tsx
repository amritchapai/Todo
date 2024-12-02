import React from 'react'
import { FaRegCircle } from 'react-icons/fa';
import "./styles/taskdetail.css"
import { useLocation } from 'react-router-dom';

interface stateElements{
  color: string
}


const TaskDetail:React.FC = () => {
  const location = useLocation();
  const state: stateElements = location.state;
  return (
    <div className={`detail-container ${state?.color}`}>
      <div className="detail-header">
        <span> title</span>
        <div className="detail-inner-header">
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
      <div className="detail-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur harum
        libero dolore itaque repudiandae distinctio voluptatum cupiditate vel
        consectetur dolorum? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Vel, ad quaerat officiis veritatis nesciunt adipisci repellat
        eveniet consectetur hic dolore.
      </div>
    </div>
  );
}

export default TaskDetail