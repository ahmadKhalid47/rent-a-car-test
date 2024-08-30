import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  Configurations: "",
};

export const ConfigurationsSlice = createSlice({
  name: "Configurations",
  initialState,
  reducers: {
    setConfigurations: (state, action) => {
      state.Configurations = action.payload;
    },
  },
});

export const { setConfigurations } = ConfigurationsSlice.actions;

export default ConfigurationsSlice.reducer;
