import { ReactNode, useEffect, useState } from 'react'
import { AuthContext } from './authContext'

const AuthProvider = ({children}:{children: ReactNode}) => {

     const [isAuthenticated, setAuthentication] = useState<boolean>(() => {
       const storedAuth = localStorage.getItem("isAuthenticated");
       return storedAuth === "true"; 
     });

     useEffect(() => {
       localStorage.setItem("isAuthenticated", isAuthenticated.toString());
     }, [isAuthenticated]);
  return (
    <AuthContext.Provider value={{isAuthenticated, setAuthentication}}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider