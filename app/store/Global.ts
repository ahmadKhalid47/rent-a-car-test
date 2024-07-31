import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  fieldName: "",
  sidebarShowTemp: true,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setSidebarShowR: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setFieldNameR: (state, action) => {
      state.fieldName = action.payload;
    },
    setSidebarShowTempR: (state, action) => {
      state.sidebarShowTemp = action.payload;
    },
  },
});

export const { setSidebarShowR, setSidebarShowTempR, setFieldNameR } =
  GlobalSlice.actions;

export default GlobalSlice.reducer;
