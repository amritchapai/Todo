import React, { useState } from "react";
import Button from "../components/Button/Button";
import "./styles/addtask.css";

interface editTask {
  title: string;
  description: string;
  deadline: string;
  priority: string;
}

const EditTask: React.FC = () => {
  const [taskDetail, setTaskDetail] = useState<editTask>({
    title: "hello",
    description: "how are you",
    deadline: "2024-04-09",
    priority: "Medium",
  });

  const changeEventHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTaskDetail({ ...taskDetail, [e.target.name]: e.target.value });
  };

  const editTaskHandler = (): void => {
    console.log(taskDetail);
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
        <Button text="Add Task" handler={editTaskHandler} />
      </div>
    </div>
  );
};

export default EditTask;
