import React, { useState } from "react";
import "./styles/addtask.css";
import Button from "../components/Button/Button";

interface addTask {
  title: string;
  description: string;
  deadline: string;
  priority: string;
}

const AddTask: React.FC = () => {
  const [taskDetail, setTaskDetail] = useState<addTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });

  const changeEventHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTaskDetail({ ...taskDetail, [e.target.name]: e.target.value });
  };

  const addTaskHandler = (): void => {
    console.log(taskDetail);
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
