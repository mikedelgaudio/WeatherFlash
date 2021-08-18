import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherLookup: {
    id: 0,
    city: "",
    location: {
      lat: 0,
      long: 0,
    },
  },
};

const weatherLookupSlice = createSlice({
  name: "weatherLookup",
  initialState,
  reducers: {
    changeWeatherLookup: (state, action) => {
      // TODO map data results
      state = action.payload;
    },
  },
});

export const { changeWeatherData } = weatherSlice.actions;
export default weatherDataSlice.reducer;
