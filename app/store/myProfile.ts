import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  profilePic: null,
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  admin: false,
};

export const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
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
    setphoneR: (state, action) => {
      state.phone = action.payload;
    },
    setemailR: (state, action) => {
      state.email = action.payload;
    },
    setaddressR: (state, action) => {
      state.address = action.payload;
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
  setadminR,
  setAllValues,
} = myProfileSlice.actions;

export default myProfileSlice.reducer;
