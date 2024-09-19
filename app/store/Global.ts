import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: false,
  sidebarShowTemp: true,
  loginPage: true,
  check: "",
  vehicleDataReloader: 0,
  myProfileReloader: 0,
  companyProfileReloader: 0,
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
    setMyProfileReloader: (state, action) => {
      state.myProfileReloader = action.payload;
    },
    setcompanyProfileReloader: (state, action) => {
      state.companyProfileReloader = action.payload;
    },
  },
});

export const {
  setSidebarShowR,
  setSidebarShowTempR,
  setLoginPageR,
  setCheck,
  setVehicleDataReloader,
  setMyProfileReloader,
  setcompanyProfileReloader
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
