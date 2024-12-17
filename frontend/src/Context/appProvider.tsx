import { ReactNode, useReducer } from "react";
import { appReducer } from "../Reducers/appReducer";
import { AppContext } from "./appContext";

//app provider component to wrap childrens
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    task: [],
    categories: [],
  });


  //   const fetchTask = async () => {
  //     console.log("fetching task");
  //     const response = await axios.get("http://localhost:8080/api/getalltask", {
  //       withCredentials: true,
  //     });
  //     console.log(response.data.data)
  //     if (response.data.success) {
  //       dispatch({ type: "set_tasks", payload: response.data.data });
  //     }
  //   };
  //   fetchTask();
  // }, []);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/getallcategory",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.data.success) {
  //       dispatch({ type: "set_category", payload: response.data.data });
  //     }
  //   };
  //   fetchCategories();
  // }, []);

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
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
