import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: {
    temp: {
      current: 0,
      high: 0,
      low: 0,
      feelsLike: 0,
    },
    condition: {
      main: "N/A",
      description: "N/A",
      icon: "",
    },
    sunrise: 0,
    sunset: 0,
    wind: { speed: 0, deg: 0 },
    humidity: 0,
    visibility: 0,
    timezone: 0,
    cityName: "N/A",
    stateName: "",
    cityId: 0,
    coords: { lat: 0, long: 0 },
  },
};

const weatherSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    changeWeatherData: (state, action) => {
      // TODO map data results
      state = action.payload;
    },
  },
});

export const { changeWeatherData } = weatherSlice.actions;
export default weatherDataSlice.reducer;
