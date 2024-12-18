import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./styles/taskdetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AppContext } from "../Context/appContext";
import ITask from "../Interfaces/taskInterface";
import ICategory from "../Interfaces/categoryInterface";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface colors {
  [key: string]: string;
}

const TaskDetail: React.FC = () => {
  const colors: colors = {
    High: "gray",
    Medium: "blue",
    Low: "green",
  };
  const context = useContext(AppContext);
  const navigate = useNavigate();
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
  const task: ITask | undefined = context.state.task.find(
    (task) => task._id === taskId
  );
  if (!task) {
    return <div>Such task does not exist</div>;
  }
  let deadline: string = "";
  if (task.deadline) {
    deadline = task.deadline.split("T")[0];
  }
  const category: ICategory | undefined = context.state.categories.find(
    (category) => category._id === task.category
  );

  const markCompleted = async (
    e: React.MouseEvent<SVGElement>
  ): Promise<void> => {
    e.stopPropagation();
    try {
      console.log(task._id);
      const response = await axios.post(
        `https://todo-s0jh.onrender.com/api/markcomplete/${task._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        context?.dispatch({
          type: "markTaskCompelete",
          payload: response.data.data,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected Error Occurred");
      }
    }
  };
  const editHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    navigate(`/edittask/${task._id}`);
  };

  const deleteTaskHandler = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `https://todo-s0jh.onrender.com/api/deletetask/${task._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(task._id);
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        context?.dispatch({ type: "delete_task", payload: task._id });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error Occured");
        console.log(error);
      }
    }
  };

  return (
    <div className={`detail-container ${colors[task.priority]}`}>
      <div className="detail-header">
        <div className="detail-header-inner">
          <span>{task.title}</span>
          <div className="vertical-dots">
            <div onClick={functionOpenOption}>
              <BsThreeDotsVertical size={18} />
            </div>
            {openOptions && (
              <div className="detail-options" ref={outsideClick}>
                <div className="detail-edit-div" onClick={editHandler}>
                  <FaEdit size={20} />
                  <span className="detail-delete">Edit</span>
                </div>
                <div className="detail-delete-div" onClick={deleteTaskHandler}>
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
              <span className="inner-text">{deadline}</span>
              <ImCheckboxUnchecked size={20} onClick={markCompleted} />
            </>
          )}
        </div>
      </div>
      <hr />
      <textarea defaultValue={task.description} readOnly></textarea>
    </div>
  );
};

export default TaskDetail;
