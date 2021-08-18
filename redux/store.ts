import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import weatherDataReducer from "./weatherDataSlice";
import weatherLookupReducer from "./weatherLookupSlice";

export default configureStore({
  reducer: {
    themes: themeReducer,
    weatherData: weatherDataReducer,
    weatherLookup: weatherLookupReducer,
  },
});
