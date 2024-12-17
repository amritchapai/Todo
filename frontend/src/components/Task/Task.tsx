import React, { useContext, useEffect, useRef, useState } from "react";
import "./task.css";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ITask from "../../Interfaces/taskInterface";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AppContext } from "../../Context/appContext";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

interface taskProps {
  color?: string;
  task: ITask;
  category: string | undefined;
}

const Task: React.FC<taskProps> = ({ color, task, category }) => {
  const context = useContext(AppContext);
  const outsideClick = useRef<HTMLDivElement | null>(null);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const navigate = useNavigate();
  let deadline: string = "";
  if (task.deadline) {
    deadline = task.deadline.split("T")[0];
  }

  const taskClickHandler = (): void => {
    navigate(`/taskdetail/${task._id}`, {
      state: {
        color: color,
      },
    });
  };

  const functionOpenOption = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setOpenOptions(true);
  };

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
                <div className="edit-div" onClick={editHandler}>
                  <FaEdit size={20} />
                  <span className="delete">Edit</span>
                </div>
                <div className="delete-div" onClick={deleteTaskHandler}>
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

          {task.completed ? (
            <ImCheckboxChecked size={20} />
          ) : (
            <ImCheckboxUnchecked size={20} onClick={markCompleted} />
          )}
        </div>
      </div>
      <hr />
      <textarea
        className="task-body"
        defaultValue={task.description}
        readOnly
      ></textarea>
    </div>
  );
};

export default Task;
