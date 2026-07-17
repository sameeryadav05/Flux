import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artifacts: [],
  isOpen: false,
};

const artifactSlice = createSlice({
  name: "artifact",
  initialState,
  reducers: {
    setArtifacts: (state, action) => {
      state.artifacts = action.payload;
      state.isOpen = action.payload.length > 0;
    },

    clearArtifacts: (state) => {
      state.artifacts = [];
      state.isOpen = false;
    },

    openArtifacts: (state) => {
      state.isOpen = true;
    },

    closeArtifacts: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  setArtifacts,
  clearArtifacts,
  openArtifacts,
  closeArtifacts,
} = artifactSlice.actions;

export default artifactSlice.reducer;