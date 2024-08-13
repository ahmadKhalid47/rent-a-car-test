import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleId: "",
  make: "",
  model: "",
  type: "",
  year: "",
  registration: "",
  color: "",
  fuelType: "",
  transmission: "",
  odometer: "",
  passengers: "",
  country: "",
  city: "",
  postalCode:"",
};

export const VehicleSlice = createSlice({
  name: "Vehicle",
  initialState,
  reducers: {
    setvehicleIdR: (state, action) => {
      state.vehicleId = action.payload;
    },
    setmakeR: (state, action) => {
      state.make = action.payload;
    },
    setmodelR: (state, action) => {
      state.model = action.payload;
    },
    settypeR: (state, action) => {
      state.type = action.payload;
    },
    setyearR: (state, action) => {
      state.year = action.payload;
    },
    setregistrationR: (state, action) => {
      state.registration = action.payload;
    },
    setcolorR: (state, action) => {
      state.color = action.payload;
    },
    setfuelTypeR: (state, action) => {
      state.fuelType = action.payload;
    },
    settransmissionR: (state, action) => {
      state.transmission = action.payload;
    },
    setodometerR: (state, action) => {
      state.odometer = action.payload;
    },
    setpassengersR: (state, action) => {
      state.passengers = action.payload;
    },
    setcountryR: (state, action) => {
      state.country = action.payload;
    },
    setcityR: (state, action) => {
      state.city = action.payload;
    },
    setpostalCodeR: (state, action) => {
      state.postalCode = action.payload;
    },
  },
});

export const {
  setvehicleIdR,
  setmakeR,
  setmodelR,
  settypeR,
  setyearR,
  setregistrationR,
  setcolorR,
  setfuelTypeR,
  settransmissionR,
  setodometerR,
  setpassengersR,
  setcountryR,
  setcityR,
  setpostalCodeR,
} = VehicleSlice.actions;

export default VehicleSlice.reducer;
