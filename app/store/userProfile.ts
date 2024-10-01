import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  user: "",
  profilePic: [],
  username: "",
  firstName: "",
  lastName: "",
  name: "",
  phone: "",
  gender: "",
  email: "",
  address: "",
  company: "",
  country: "",
  state: "",
  city: "",
  plan: "",
  password: "",
  verifyPassword: "",
  admin: undefined,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    set_idR: (state, action) => {
      state._id = action.payload;
    },
    setuserR: (state, action) => {
      state.user = action.payload;
    },
    setprofilePicR: (state, action) => {
      state.profilePic = action.payload;
    },
    setusernameR: (state, action) => {
      state.username = action.payload;
    },
    setfirstNameR: (state, action) => {
      state.firstName = action.payload;
    },
    setlastNameR: (state, action) => {
      state.lastName = action.payload;
    },
    setnameR: (state, action) => {
      state.name = action.payload;
    },
    setcompanyR: (state, action) => {
      state.company = action.payload;
    },
    setgenderR: (state, action) => {
      state.gender = action.payload;
    },
    setphoneR: (state, action) => {
      state.phone = action.payload;
    },
    setemailR: (state, action) => {
      state.email = action.payload;
    },
    setaddressR: (state, action) => {
      state.address = action.payload;
    },
    setcountryR: (state, action) => {
      state.country = action.payload;
    },
    setstateR: (state, action) => {
      state.state = action.payload;
    },
    setcityR: (state, action) => {
      state.city = action.payload;
    },
    setplanR: (state, action) => {
      state.plan = action.payload;
    },
    setpasswordR: (state, action) => {
      state.password = action.payload;
    },
    setverifyPasswordR: (state, action) => {
      state.verifyPassword = action.payload;
    },
    setadminR: (state, action) => {
      state.admin = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setprofilePicR,
  setusernameR,
  setfirstNameR,
  setlastNameR,
  setphoneR,
  setemailR,
  setaddressR,
  setuserR,
  setnameR,
  setadminR,
  setAllValues,
  set_idR,
  setcompanyR,
  setgenderR,
  setcityR,
  setcountryR,
  setstateR,
  setplanR,
  setpasswordR,
  setverifyPasswordR,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
