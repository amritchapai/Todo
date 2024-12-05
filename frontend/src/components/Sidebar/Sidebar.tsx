import React, { useContext, useEffect, useRef, useState } from "react";
import Categories from "../Categories/Categories";
import { IoIosArrowDropdown, IoMdAddCircle } from "react-icons/io";
import "./sidebar.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AppContext } from "../../Context/appContext";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const mouseClickRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [category,  setCategory] = useState<string>("");
  const context = useContext(AppContext)
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
  if (!context) {
    return <div>Loading...</div>;
  }

  const addCategoryHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    console.log(category)
    try {
      const response = await axios.post(
        "http://localhost:8080/api/addCategory", {category},{
          headers:{
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      if(response.data.success){
        toast.success(response.data.message);
        context.dispatch({type:"add_category", payload: response.data.data})
        setOpenAddCategory(false);
        setCategory("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message);
      }
      else{
        toast.error("Unexpected error occured")
      }
    }
  };

  const toggleOpen = (): void => {
    setOpen((prev) => !prev);
  };

  const addCategoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const openByCategory =(categoryId: string):void=>{
    navigate(`/category/${categoryId}`)
  }
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
      {
        context.state.categories.map((category)=>{
          return (
            <div key={category._id} onClick={()=>openByCategory(category._id)}>
              <Categories
                key={category._id}
                text={category.categoryName}
                color="category-color"
              />
            </div>
          );
        })
      }
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
