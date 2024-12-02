import React, { useEffect, useRef, useState } from "react";
import Categories from "../Categories/Categories";
import { IoIosArrowDropdown, IoMdAddCircle } from "react-icons/io";
import "./sidebar.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const mouseClickRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [category,  setCategory] = useState<string>("");

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        mouseClickRef.current &&
        !mouseClickRef.current.contains(event.target as Node)
      ) {
        setOpenAddCategory(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const addCategoryHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setOpenAddCategory(false);
    setCategory("");
    navigate("/");
    console.log(category);
  };

  const toggleOpen = (): void => {
    setOpen((prev) => !prev);
  };

  const addCategoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="sidebar-container">
      <div className="priority cursor" onClick={toggleOpen}>
        <div className="priority-inner">
          <span>Priority</span>
          <IoIosArrowDropdown size={20} />
        </div>
      </div>
      {open && (
        <div>
          <Categories key={-1} text="High" />
          <Categories key={-2} text="Medium" />
          <Categories key={-3} text="Low" />
        </div>
      )}
      <div className="categories gap">
        <span>Categories</span>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <Categories key={index} text="Work" color="category-color" />
      ))}
      <div className="categories add" onClick={() => setOpenAddCategory(true)}>
        <IoMdAddCircle size={20} /> <span>Add a new Category</span>
        {openAddCategory && (
          <div className="add-category" ref={mouseClickRef}>
            <div className="add-header">
              <span>Add category</span>
            </div>
            <hr />
            <div className="add-body">
              <label>
                Category name
                <input
                  className="add-input"
                  name="category"
                  value={category}
                  onChange={addCategoryChangeHandler}
                  type="text"
                />
              </label>
            </div>
            <div className="add-button">
              <Button text="Add" handler={addCategoryHandler} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
