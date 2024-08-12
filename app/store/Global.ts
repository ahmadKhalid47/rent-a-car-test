import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: false,
  fieldName: "",
  sidebarShowTemp: true,
  loginPage: false,
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
  },
});

export const { setSidebarShowR, setSidebarShowTempR, setFieldNameR ,setLoginPageR} =
  GlobalSlice.actions;

export default GlobalSlice.reducer;
