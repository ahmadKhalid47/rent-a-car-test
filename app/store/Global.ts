import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setSidebarShowR: (state, action) => {
      state.sidebarShow = action.payload;
    },
  },
});

export const { setSidebarShowR } = GlobalSlice.actions;

export default GlobalSlice.reducer;
