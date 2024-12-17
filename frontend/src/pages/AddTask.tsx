import React, { useContext, useState } from "react";
import "./styles/addtask.css";
import Button from "../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AppContext } from "../Context/appContext";

interface addTask {
  title: string;
  description: string;
  deadline: string;
  priority: string;
}

const AddTask: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId: string = location.pathname.split("/")[2];

  const [taskDetail, setTaskDetail] = useState<addTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "Low",
  });

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

  if (!context) {
    return <div>Loading......</div>;
  }

  const addTaskHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log(taskDetail);
    try {
      const response = await axios.post(
        `https://todo-s0jh.onrender.com/api/addtask/${categoryId}`,
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
        context.dispatch({ type: "add_task", payload: response.data.data });
        navigate(`/category/${categoryId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An Unexpected error occured");
      }
    }
  };
  return (
    <div className="add-task-container">
      <span className="add-task-title">Add a task</span>
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
            defaultChecked
          />
          Low
        </label>
      </form>
      <div className="form-button">
        <Button text="Add Task" handler={addTaskHandler} />
      </div>
    </div>
  );
};

export default AddTask;
