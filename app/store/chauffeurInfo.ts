import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  chauffeurInfo: null,
};

export const chauffeurInfoSlice = createSlice({
  name: "chauffeurInfo",
  initialState,
  reducers: {
    setchauffeurInfo: (state, action) => {
      state.chauffeurInfo = action.payload;
    },
  },
});

export const { setchauffeurInfo } = chauffeurInfoSlice.actions;

export default chauffeurInfoSlice.reducer;
