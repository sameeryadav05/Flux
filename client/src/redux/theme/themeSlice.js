import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:localStorage.getItem("fluxai_theme") || "dark"
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toogleTheme(state){
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setDark(state){
            state.mode = "dark"
        },

        setLight(state){
            state.mode = "light"
        }
    }
})

export const {
    toogleTheme,
    setDark,
    setLight
} = themeSlice.actions

export default themeSlice.reducer;