import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: null,
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
};

export const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
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
  setAllValues,
} = myProfileSlice.actions;

export default myProfileSlice.reducer;
