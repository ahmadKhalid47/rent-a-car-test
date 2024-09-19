import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: null,
};

export const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    setprofilePicR: (state, action) => {
      state.profilePic = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setprofilePicR,
  setAllValues,
} = companyProfileSlice.actions;

export default companyProfileSlice.reducer;
