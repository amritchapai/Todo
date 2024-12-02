import React from "react";
import "./styles/addtask.css"
import Button from "../components/Button/Button";

const AddTask: React.FC = () => {
    const addTaskHandler = ():void=>{

    }
  return (
    <div className="add-task-container">
      <span className="add-task-title">Add a task</span>
      <form className="add-task-form">
        <label>Title</label>
        <input className="add-task-input" type="textarea" />
        <label>Description </label>
        <textarea
          className="add-task-input description"
          name=""
          id=""
        ></textarea>
        <label>Deadline</label>
        <input className="add-task-input" type="textarea" />
        <label>Priority</label>
        <label>
          <input
            className="radio"
            type="radio"
            name="priority"
            value="High"
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
            required
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
