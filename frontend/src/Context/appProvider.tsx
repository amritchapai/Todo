import { ReactNode, useReducer } from "react";
import { appReducer } from "../Reducers/appReducer";
import { AppContext } from "./appContext";

//app provider component to wrap childrens
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    task: [],
    categories: [],
  });

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
