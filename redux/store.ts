import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import weatherDataSlice from "./weatherDataSlice";

export default configureStore({
  reducer: {
    themes: themeReducer,
    weatherData: weatherDataSlice,
    weatherLookup: weatherLookupSlice,
  },
});
