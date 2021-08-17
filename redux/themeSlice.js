import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: localStorage?.theme || "lightmode",
  list: [
    { id: 0, name: "lightmode", title: "Light Mode" },
    { id: 1, name: "darkmode", title: "Dark Mode" },
  ],
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
