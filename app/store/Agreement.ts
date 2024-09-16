import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  terms: "",
};

export const AgreementSlice = createSlice({
  name: "Agreement",
  initialState,
  reducers: {
    settermsR: (state, action) => {state.terms = action.payload},
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  settermsR,
  setAllValues,
} = AgreementSlice.actions;

export default AgreementSlice.reducer;
