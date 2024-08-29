import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: false,
  sidebarShowTemp: true,
  loginPage: true,
  check: "",
  vehicleDataReloader: 0,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setSidebarShowR: (state, action) => {
      state.sidebarShow = action.payload;
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
    setVehicleDataReloader: (state, action) => {
      state.vehicleDataReloader = action.payload;
    },
  },
});

export const {
  setSidebarShowR,
  setSidebarShowTempR,
  setLoginPageR,
  setCheck,
  setVehicleDataReloader,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
