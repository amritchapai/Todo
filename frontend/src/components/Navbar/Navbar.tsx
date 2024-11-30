import React, { useState } from "react";
import { IoIosArrowDropdown, IoMdAddCircle } from "react-icons/io";
import "./navbar.css";
import Categories from "../Categories/Categories";

const Navbar: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = ():void =>{
    setOpen(prev => !prev)
  }
  return (
    <div>
      <div className="navbar-container">
        <strong>ToDO WebApp</strong>
      </div>
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
        {[1, 2, 5, 1, 1, 1, 1, 1].map((index) => (
          <Categories key={index} text="Work" color="category-color" />
        ))}
        <div className="categories add">
         <IoMdAddCircle size={20}/> <span>Add a new Category</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
