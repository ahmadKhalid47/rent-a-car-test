import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  customerType: "",
  name: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  color: "",
  emailAddress: "",
  phone: "",
  alternativePhone: "",
  passengers: "",
  streetAddress: "",
  country: "",
  city: "",
  postalCode: "",
  isVip: "",
  carImages: [],
};

export const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    setcustomerTypeR: (state, action) => {
      state.customerType = action.payload;
    },
    setnameR: (state, action) => {
      state.name = action.payload;
    },
    setgenderR: (state, action) => {
      state.gender = action.payload;
    },
    setdateOfBirthR: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setnationalityR: (state, action) => {
      state.nationality = action.payload;
    },
    setcolorR: (state, action) => {
      state.color = action.payload;
    },
    setemailAddressR: (state, action) => {
      state.emailAddress = action.payload;
    },
    setphoneR: (state, action) => {
      state.phone = action.payload;
    },
    setalternativePhoneR: (state, action) => {
      state.alternativePhone = action.payload;
    },
    setpassengersR: (state, action) => {
      state.passengers = action.payload;
    },
    setstreetAddressR: (state, action) => {
      state.streetAddress = action.payload;
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
    setisVipR: (state, action) => {
      state.isVip = action.payload;
    },
    setcarImagesR: (state, action) => {
      state.carImages = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
  },
});

export const {
  setcustomerTypeR,
  setnameR,
  setgenderR,
  setdateOfBirthR,
  setnationalityR,
  setcolorR,
  setemailAddressR,
  setphoneR,
  setalternativePhoneR,
  setpassengersR,
  setstreetAddressR,
  setcountryR,
  setcityR,
  setpostalCodeR,
  setisVipR,
  setcarImagesR,
  setAllValues,
  resetState,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
