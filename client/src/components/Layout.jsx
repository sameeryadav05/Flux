import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider';


export const PublicRoutes = ({children}) => {

    const {isAuthenticated} = useAuth()

    if(isAuthenticated)
    {
         return <Navigate to="/ai" replace />;
    }
    return children;
    
}

export const ProtectedRoutes = ({ children }) => {

    const {
        isAuthenticated,
        isError,
        error,
    } = useAuth();

    if (isError && error?.response?.status === 401) {
        return <Navigate to="/" replace />;
    }

    return children;
};