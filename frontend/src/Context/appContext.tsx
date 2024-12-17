import { createContext } from "react";
import ICategory from "../Interfaces/categoryInterface";
import ITask from "../Interfaces/taskInterface";

interface appState {
  task: ITask[];
  categories: ICategory[];
}

//types of action that can come
type Action =
  | { type: "set_tasks"; payload: ITask[] }
  | { type: "set_category"; payload: ICategory[] }
  | { type: "add_task"; payload: ITask }
  | { type: "edit_task"; payload: ITask }
  | { type: "delete_task"; payload: string }
  | { type: "add_category"; payload: ICategory }
  | { type: "delete_category"; payload: string }
  | { type: "markTaskCompelete"; payload: ITask }
  | {type: "clear_state"; payload: null}

interface appContext {
  state: appState;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<appContext | undefined>(undefined);
