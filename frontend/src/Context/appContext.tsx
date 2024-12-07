import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import ICategory from "../Interfaces/categoryInterface";
import ITask from "../Interfaces/taskInterface";
import axios from "axios";
import { appReducer } from "../Reducers/appReducer";

interface appState {
  task: ITask[];
  categories: ICategory[];
}

type Action =
  | { type: "set_tasks"; payload: ITask[] }
  | { type: "set_category"; payload: ICategory[] }
  | { type: "add_task"; payload: ITask }
  | { type: "edit_task"; payload: ITask }
  | { type: "delete_task"; payload: string }
  | { type: "add_category"; payload: ICategory }
  | { type: "delete_category"; payload: string }
  | { type: "markTaskCompelete"; payload: ITask };

interface appContext {
  state: appState;
  dispatch : React.Dispatch<Action>
  // addTask: (task: Partial<ITask>, categoryId: string) => Promise<void>;
  // editTask: (taskId: string, updatedTask: Partial<ITask>) => Promise<void>;
  // deleteTask: (taskId: string) => Promise<void>;
  // addCategory: (category: Partial<ICategory>) => Promise<void>;
  // deleteCategory: (categoryId: string) => Promise<void>;
  // markTaskCompelete: (
  //   taskId: string,
  //   updatedTask: Partial<ITask>
  // ) => Promise<void>;
}

export const AppContext = createContext<appContext | undefined>(undefined);


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    task: [],
    categories: [],
  });
  useEffect(() => {
    
    const fetchTask = async () => {
      console.log("fetching task");
      const response = await axios.get("http://localhost:8080/api/getalltask", {
        withCredentials: true,
      });
      console.log(response.data.data)
      if (response.data.success) {
        dispatch({ type: "set_tasks", payload: response.data.data });
      }
    };
    fetchTask();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/getallcategory",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch({ type: "set_category", payload: response.data.data });
      }
    };
    fetchCategories();
  }, []);

  // const addTask = async (task: Partial<ITask>, categoryId: string) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/addtask/${categoryId}`,
  //       task,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(response.data); //to debug
  //     if (!response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       dispatch({ type: "add_task", payload: response.data.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const editTask = async (taskId: string, task: Partial<ITask>) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/edittask/${taskId}`,
  //       task,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(response.data); //to debug
  //     if (!response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       dispatch({ type: "edit_task", payload: response.data.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteTask = async (taskId: string) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/deletetask/${taskId}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (!response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       dispatch({ type: "delete_task", payload: taskId });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addCategory = async (category: Partial<ICategory>) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/addCategory",
  //       category,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (!response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       dispatch({ type: "add_category", payload: response.data.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteCategory = async (categoryId: string) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/deleteCategory/${categoryId}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (!response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       dispatch({ type: "delete_category", payload: response.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const markTaskCompelete = async (
  //   taskId: string,
  //   updatedTask: Partial<ITask>
  // ) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/markcomplete/${taskId}`,
  //       updatedTask,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(response.data); //to debug
  //     if (!response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       dispatch({ type: "markTaskCompelete", payload: response.data.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
        // addTask,
        // editTask,
        // deleteTask,
        // addCategory,
        // deleteCategory,
        // markTaskCompelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

