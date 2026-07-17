import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice.js'
import artifactReducer from './Artifcacts/ArtifactSlice.js'

export const store = configureStore({
  reducer: {
    theme:themeReducer,
    artifact: artifactReducer,
  },
})