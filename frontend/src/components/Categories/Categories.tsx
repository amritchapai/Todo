import React, { useContext } from 'react'
import "./categories.css"
import { MdDelete } from 'react-icons/md';
import axios, { AxiosError } from 'axios';
import ICategory from '../../Interfaces/categoryInterface';
import { AppContext } from '../../Context/appContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CategoriesProps{
    category: ICategory
    action?: ()=>void,
    color?: string
}

const Categories:React.FC<CategoriesProps>= ({category, color}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const deleteCategory = async ()=>{
    try {
      const response = await axios.post(
        `http://localhost:8080/api/deleteCategory/${category._id}`,{},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true,
        }
      );
      if(response.data.success){
        context?.dispatch({type: "delete_category", payload: category._id})
        toast.success(response.data.message);
        navigate("/");
        console.log(response.data.data)
      }

    } catch (error) {
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message);
      }
    }
  }
  return (
    <div className={`category-card ${color}`}>
      <span>{category.categoryName} </span>
      <div className="delete-icon">
        <MdDelete size={20} onClick={deleteCategory}/>
      </div>
    </div>
  );
}

export default Categories