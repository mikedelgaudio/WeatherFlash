import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMsg: "",
  userSearched: false,
  loading: false,
  search: {
    results: [],
  },
};

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      // TODO map data results
      state.search.loading = action.payload;
    },
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { changeSearch, changeLoading } = appSlice.actions;
export default appSlice.reducer;
