import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import ICategory from "../Interfaces/categoryInterface";
import ITask from "../Interfaces/taskInterface";
import axios from "axios";

interface appState {
  task: ITask[];
  categories: ICategory[];
}

interface appContext {
  state: appState;
  addTask: (task: Partial<ITask>, categoryId: string) => Promise<void>;
  editTask: (taskId: string, updatedTask: Partial<ITask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addCategory: (category: Partial<ICategory>) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  markTaskCompelete: (
    taskId: string,
    updatedTask: Partial<ITask>
  ) => Promise<void>;
}

const AppContext = createContext<appContext | undefined>(undefined);

const appReducer = (state: appState, action: any): appState => {
  switch (action.type) {
    case "set_tasks":
      return { ...state, task: action.payload };
    case "set_category":
      return { ...state, categories: action.payload };
    case "add_task":
      return {
        task: [...state.task, action.payload],
        categories: state.categories.map((category) => {
          if (category._id === action.payload.category) {
            return { ...category, tasks: [...category.tasks, action.payload] };
          }
          return category;
        }),
      };
    case "edit_task":
      return {
        ...state,
        task: state.task.map((task) => {
          return task._id === action.payload._id ? action.payload : task;
        }),
      };
    case "delete_task":
      return {
        ...state,
        task: state.task.filter((task) => {
          return task._id != action.payload;
        }),
      };
    case "add_category":
      return { ...state, categories: [...state.categories, action.payload] };
    case "delete_category":
      return {
        task: state.task.filter((task) => {
          return task.category !== action.payload;
        }),
        categories: state.categories.filter((category) => {
          return category._id !== action.payload;
        }),
      };
    case "markTaskCompelete":
      return {
        ...state,
        task: state.task.map((task) => {
          return task._id === action.payload._id ? action.payload : task;
        }),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    task: [],
    categories: [],
  });
 useEffect(() => {
   const fetchTask = async () => {
       const response = await axios.get("http://localhost:8080/api/getalltask", {
         withCredentials: true,
       });
       if (response.data.success) {
         dispatch({ type: "set_tasks", payload: response.data.data });
       
     };
   };
   fetchTask();
 }, []);

 useEffect(() => {
   const fetchCategories = async () => {
       const response = await axios.get("http://localhost:8080/api/getallcategory", {
         withCredentials: true,
       });
       if (response.data.success) {
         dispatch({ type: "set_category", payload: response.data.data });
       }
   };
   fetchCategories();
 }, []);

  const addTask = async (task: Partial<ITask>, categoryId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/addtask/${categoryId}`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data); //to debug
      if (!response.data.success) {
        console.log(response.data.message);
      } else {
        dispatch({ type: "add_task", payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async ( taskId: string, task: Partial<ITask>) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/edittask/${taskId}`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data); //to debug
      if (!response.data.success) {
        console.log(response.data.message);
      } else {
        dispatch({ type: "edit_task", payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/deletetask/${taskId}`,
        {
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        console.log(response.data.message);
      } else {
        dispatch({ type: "delete_task", payload: taskId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (category: Partial<ICategory>) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/addCategory",
        category,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        console.log(response.data.message);
      } else {
        dispatch({ type: "add_category", payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/deleteCategory/${categoryId}`,
        {
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        console.log(response.data.message);
      } else {
        dispatch({ type: "delete_category", payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTaskCompelete = async (
    taskId: string,
    updatedTask: Partial<ITask>
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/markcomplete/${taskId}`,
        updatedTask,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data); //to debug
      if (!response.data.success) {
        console.log(response.data.message);
      } else {
        dispatch({ type: "markTaskCompelete", payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AppContext.Provider value={{state, addTask, editTask, deleteTask, addCategory, deleteCategory, markTaskCompelete}}>
        {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () =>{
    const context = useContext(AppContext);
    if(!context){
        console.log("use context within the provider")
    }
    return context;
}