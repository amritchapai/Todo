import React, { useContext, useEffect, useRef, useState } from "react";
import Categories from "../Categories/Categories";
import { IoMdAddCircle } from "react-icons/io";
import "./sidebar.css";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AppContext } from "../../Context/appContext";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mouseClickRef = useRef<HTMLDivElement | null>(null);
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const context = useContext(AppContext);
  const currentPath = location.pathname;

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

  const addCategoryHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.stopPropagation();
    console.log(category);
    try {
      const response = await axios.post(
        "https://todo-s0jh.onrender.com/api/addCategory",
        { category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        context.dispatch({ type: "add_category", payload: response.data.data });
        setOpenAddCategory(false);
        setCategory("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error occured");
      }
    }
  };

  const addCategoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 18) {
      toast.error("Category name should be short");
    } else {
      setCategory(e.target.value);
    }
    console.log(e.target.value);
  };

  const openByCategory = (categoryId: string): void => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="sidebar-container">
      <div
        onClick={() => navigate("/")}
        className={`category-card ${
          currentPath === "/" ? "all-task-color" : ""
        }`}
      >
        <span>All tasks</span>
      </div>
      <div className="categories gap">
        <span>Categories</span>
      </div>
      {context.state.categories.map((category) => {
        return (
          <div key={category._id} onClick={() => openByCategory(category._id)}>
            <Categories key={category._id} category={category} />
          </div>
        );
      })}
      <div className="categories add" onClick={() => setOpenAddCategory(true)}>
        <IoMdAddCircle size={20} /> <span>Add a new Category</span>
        {openAddCategory && (
          <div className="add-category" ref={mouseClickRef}>
            <div className="add-header">
              <span>Add category</span>
            </div>
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
