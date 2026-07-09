

import React, { useEffect } from 'react'
import { useSelector } from "react-redux";

const ThemeProvider = ({children}) => {
    const theme = useSelector((state)=>state.theme.mode) 
    useEffect(()=>{

        const html = document.documentElement;
        if(theme=='dark')
        {
            html.classList.add('dark')
        }
        else{
            html.classList.remove('dark')
        }

        localStorage.setItem("fluxai_theme", theme);

    },[theme])
    return children;
}

export default ThemeProvider