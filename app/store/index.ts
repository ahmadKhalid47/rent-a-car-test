import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Global from "./Global";
import Vehicle from "./Vehicle";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  Global: Global,
  Vehicle: Vehicle,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
