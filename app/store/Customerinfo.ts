import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  CustomerInfo: null,
};

export const CustomerInfoSlice = createSlice({
  name: "CustomerInfo",
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      state.CustomerInfo = action.payload;
    },
  },
});

export const { setCustomerInfo } = CustomerInfoSlice.actions;

export default CustomerInfoSlice.reducer;
