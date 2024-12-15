import { createContext, Dispatch, SetStateAction, useContext } from "react"

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthentication: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context must be used inside the provider components");
  }
  return context;
};