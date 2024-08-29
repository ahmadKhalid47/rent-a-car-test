import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  vehicleInfo: null,
};

export const VehicleInfoSlice = createSlice({
  name: "VehicleInfo",
  initialState,
  reducers: {
    setVehicleInfo: (state, action) => {
      state.vehicleInfo = action.payload;
    },
  },
});

export const { setVehicleInfo } = VehicleInfoSlice.actions;

export default VehicleInfoSlice.reducer;
