import { createContext, useContext } from "react";
import { useGetUserInfo } from "../api/AuthService";
import Overlayloader from "../components/Overlayloader";
import { Navigate } from "react-router-dom";


export const AuthContext = createContext(null);

const AuthProvider = ({children})=>{
    const query =useGetUserInfo()
    if(query.isLoading)
    {
        return <Overlayloader/>
    }

      const value = {
        user: query.data?.user ?? null,
        isAuthenticated: query.isSuccess,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };


    return (
      <AuthContext.Provider value={value}>
        {
          children
        }
      </AuthContext.Provider>
    )
 }


 export const useAuth = ()=>{
  return useContext(AuthContext)
 }


 export default AuthProvider;