import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  UserInfo: null,
};

export const UserInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.UserInfo = action.payload;
    },
  },
});

export const { setUserInfo } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
