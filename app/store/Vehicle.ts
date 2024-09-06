import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
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
  postalCode: "",
  rentHour: "",
  rentDay: "",
  rentWeek: "",
  rentMonth: "",
  insuranceNo: "",
  insuranceProvider: "",
  insuranceExpiry: "",
  features: [],
  otherNote: "",
  damages: [],
  carImages: [],
  damageImagesToDelete: [],
  thumbnailImage: 0,
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
    setrentHour: (state, action) => {
      state.rentHour = action.payload;
    },
    setrentDay: (state, action) => {
      state.rentDay = action.payload;
    },
    setrentWeek: (state, action) => {
      state.rentWeek = action.payload;
    },
    setrentMonth: (state, action) => {
      state.rentMonth = action.payload;
    },
    setinsuranceNo: (state, action) => {
      state.insuranceNo = action.payload;
    },
    setinsuranceProvider: (state, action) => {
      state.insuranceProvider = action.payload;
    },
    setinsuranceExpiry: (state, action) => {
      state.insuranceExpiry = action.payload;
    },
    setfeatures: (state, action) => {
      state.features = action.payload;
    },
    setotherNote: (state, action) => {
      state.otherNote = action.payload;
    },
    setdamages: (state, action) => {
      state.damages = action.payload;
    },
    setCarImages: (state, action) => {
      state.carImages = action.payload;
    },
    setdamageImagesToDelete: (state, action) => {
      state.damageImagesToDelete.push(...action.payload);
    },
    setthumbnailImage: (state, action) => {
      state.thumbnailImage = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
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
  setrentHour,
  setrentDay,
  setrentWeek,
  setrentMonth,
  setinsuranceNo,
  setinsuranceProvider,
  setinsuranceExpiry,
  setfeatures,
  setotherNote,
  setdamages,
  setCarImages,
  setAllValues,
  setdamageImagesToDelete,
  setthumbnailImage,
  resetState,
} = VehicleSlice.actions;

export default VehicleSlice.reducer;
