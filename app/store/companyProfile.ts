import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: null,
  profilePic2: null,
};

export const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    setprofilePicR: (state, action) => {
      state.profilePic = action.payload;
    },
    setprofilePic2R: (state, action) => {
      state.profilePic2 = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setprofilePicR,
  setprofilePic2R,
  setAllValues,
} = companyProfileSlice.actions;

export default companyProfileSlice.reducer;
