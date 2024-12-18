import ICategory from "../Interfaces/categoryInterface";
import ITask from "../Interfaces/taskInterface";

interface appState {
  task: ITask[];
  categories: ICategory[];
}

interface Iaction {
  type: string;
  payload: any;
}

//fuction to update state from the type of action that is passed
export const appReducer = (state: appState, action: Iaction): appState => {
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
        categories: state.categories.map((category) => {
          if (category._id === action.payload.category) {
            return {
              ...category,
              tasks: category.tasks.map((task) => {
                return task._id === action.payload._id ? action.payload : task;
              }),
            };
          } else {
            return category;
          }
        }),
      };
    case "delete_task":
      return {
        task: state.task.filter((task) => {
          return task._id != action.payload;
        }),
        categories: state.categories.map((category) => {
          return {
            ...category,
            tasks: category.tasks.filter((task) => {
              return task._id != action.payload;
            }),
          };
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
        categories: state.categories.map((category) => {
          if (category._id === action.payload.category) {
            return {
              ...category,
              tasks: category.tasks.map((task) => {
                return task._id === action.payload._id ? action.payload : task;
              }),
            };
          } else {
            return category;
          }
        }),
      };

    case "clear_state":
      return {
        task: [],
        categories: [],
      };

    default:
      return state;
  }
};
