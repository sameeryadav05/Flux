import { createContext, useContext, useEffect, useState } from "react";
import { useGetUserInfo } from "../api/AuthService";
import Overlayloader from "../components/Overlayloader";
import { Navigate } from "react-router-dom";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const query = useGetUserInfo();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (query.isLoading) {
    return <Overlayloader />;
  }

  const value = {
    user: query.data?.user ?? null,
    isAuthenticated: query.isSuccess,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,

    isCollapsed,
    setIsCollapsed,

    isMobile,
    setIsMobile,

    isOpen,
    setIsOpen,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


 export const useAuth = ()=>{
  return useContext(AuthContext)
 }


 export default AuthProvider;