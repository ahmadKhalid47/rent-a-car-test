import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: false,
  fieldName: "",
  sidebarShowTemp: true,
  loginPage: true,
  check: "",
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
    setLoginPageR: (state, action) => {
      state.loginPage = action.payload;
    },
    setCheck: (state, action) => {
      state.check = action.payload;
    },
  },
});

export const {
  setSidebarShowR,
  setSidebarShowTempR,
  setFieldNameR,
  setLoginPageR,
  setCheck,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
