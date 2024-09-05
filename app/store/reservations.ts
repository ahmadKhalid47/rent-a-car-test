import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  customer_id: "",
  chauffeur_id: "",
  vehicle_id: "",
  reservationDate: "",
  odometer: "",
  fuelStatus: "",
  securityDeposit: "",
  country: "",
  city: "",
  PickUpAddress: "",
  PickUpDate: "",
  PickUpTime: "",
  dropOffAddress: "",
  dropOffDate: "",
  dropOffTime: "",
  discount: "",
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setcustomer_idR: (state, action) => {
      state.customer_id = action.payload;
    },
    setchauffeur_idR: (state, action) => {
      state.chauffeur_id = action.payload;
    },
    setvehicle_idR: (state, action) => {
      state.vehicle_id = action.payload;
    },
    setreservationDate: (state, action) => {
      state.reservationDate = action.payload;
    },
    setodometer: (state, action) => {
      state.odometer = action.payload;
    },
    setfuelStatus: (state, action) => {
      state.fuelStatus = action.payload;
    },
    setsecurityDeposit: (state, action) => {
      state.securityDeposit = action.payload;
    },
    setcountry: (state, action) => {
      state.country = action.payload;
    },
    setcity: (state, action) => {
      state.city = action.payload;
    },
    setPickUpAddress: (state, action) => {
      state.PickUpAddress = action.payload;
    },
    setPickUpDate: (state, action) => {
      state.PickUpDate = action.payload;
    },
    setPickUpTime: (state, action) => {
      state.PickUpTime = action.payload;
    },
    setdropOffAddress: (state, action) => {
      state.dropOffAddress = action.payload;
    },
    setdropOffDate: (state, action) => {
      state.dropOffDate = action.payload;
    },
    setdropOffTime: (state, action) => {
      state.dropOffTime = action.payload;
    },
    setdiscount: (state, action) => {
      state.discount = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
  },
});

export const {
  setAllValues,
  resetState,
  setreservationDate,
  setodometer,
  setfuelStatus,
  setsecurityDeposit,
  setcountry,
  setcity,
  setPickUpAddress,
  setPickUpDate,
  setPickUpTime,
  setdropOffAddress,
  setdropOffDate,
  setdropOffTime,
  setcustomer_idR,
  setvehicle_idR,
  setchauffeur_idR,
  setdiscount,
} = reservationSlice.actions;

export default reservationSlice.reducer;
