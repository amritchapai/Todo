import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button/Button";
import "./styles/addtask.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/appContext";
import ITask from "../Interfaces/taskInterface";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface editTask {
  title: string;
  description: string;
  deadline: string;
  priority: string;
}

const EditTask: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [taskDetail, setTaskDetail] = useState<editTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });

  const location = useLocation();
  const taskId = location.pathname.split("/")[2];

  const task: ITask | undefined = context?.state.task.find((task) => {
    return task._id === taskId;
  });

  useEffect(() => {
    if (task) {
      setTaskDetail({
        title: task.title,
        description: task.description,
        deadline: task.deadline ? task.deadline.split("T")[0] : "",
        priority: task.priority,
      });
    }
  }, [task]);

  console.log(taskDetail);
  const changeEventHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (e.target.name === "title" && e.target.value.length > 25) {
      toast.error("Title should be short");
    } else {
      setTaskDetail({ ...taskDetail, [e.target.name]: e.target.value });
    }
  };

  const editTaskHandler = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `https://todo-s0jh.onrender.com/api/edittask/${task?._id}`,
        taskDetail,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        context?.dispatch({ type: "edit_task", payload: response.data.data });
        navigate(`/taskdetail/${task?._id}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error occured");
      }
    }
  };
  return (
    <div className="add-task-container">
      <span className="add-task-title">Edit a task</span>
      <form className="add-task-form">
        <label>Title</label>
        <input
          className="add-task-input"
          type="textarea"
          name="title"
          value={taskDetail.title}
          onChange={changeEventHandler}
        />
        <label>Description </label>
        <textarea
          className="add-task-input description"
          required
          name="description"
          value={taskDetail.description}
          onChange={changeEventHandler}
        ></textarea>
        <label>Deadline</label>
        <input
          className="add-task-input"
          type="date"
          name="deadline"
          value={taskDetail.deadline}
          onChange={changeEventHandler}
        />
        <label>Priority</label>
        <label>
          <input
            className="radio"
            type="radio"
            name="priority"
            value="High"
            onChange={changeEventHandler}
            required
            checked={taskDetail.priority === "High"}
          />
          High
        </label>
        <label>
          <input
            className="radio"
            type="radio"
            name="priority"
            value="Medium"
            onChange={changeEventHandler}
            required
            checked={taskDetail.priority === "Medium"}
          />
          Medium
        </label>
        <label>
          <input
            className="radio"
            type="radio"
            name="priority"
            value="Low"
            onChange={changeEventHandler}
            required
            checked={taskDetail.priority === "Low"}
          />
          Low
        </label>
      </form>
      <div className="form-button">
        <Button text="Edit Task" handler={editTaskHandler} />
      </div>
    </div>
  );
};

export default EditTask;
