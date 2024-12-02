import React, { useEffect, useRef, useState } from 'react'
import { FaEdit, FaRegCircle } from 'react-icons/fa';
import "./styles/taskdetail.css"
import { useLocation} from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface stateElements{
  color: string
}


const TaskDetail:React.FC = () => {
  const location = useLocation();
  const state: stateElements = location.state;
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
  
  return (
    <div className={`detail-container ${state?.color}`}>
      <div className="detail-header">
        <div className='detail-header-inner'>
          <span> title</span>
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
          <span className="inner-text">Category</span>
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