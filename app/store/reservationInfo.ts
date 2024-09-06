import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  reservationInfo: null,
};

export const reservationInfoSlice = createSlice({
  name: "reservationInfo",
  initialState,
  reducers: {
    setreservationInfo: (state, action) => {
      state.reservationInfo = action.payload;
    },
  },
});

export const { setreservationInfo } = reservationInfoSlice.actions;

export default reservationInfoSlice.reducer;
