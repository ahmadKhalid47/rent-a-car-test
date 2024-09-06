import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Global from "./Global";
import Vehicle from "./Vehicle";
import VehicleUpdate from "./VehicleUpdate";
import VehicleInfo from "./vehicleInfo";
import Configurations from "./Configurations";
import Customer from "./Customer";
import CustomerInfo from "./Customerinfo";
import chauffeur from "./chauffeur";
import chauffeurInfo from "./chauffeurInfo";
import reservation from "./reservations";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  Global: Global,
  Vehicle: Vehicle,
  VehicleUpdate: VehicleUpdate,
  VehicleInfo: VehicleInfo,
  Configurations: Configurations,
  Customer: Customer,
  CustomerInfo: CustomerInfo,
  chauffeur: chauffeur,
  chauffeurInfo: chauffeurInfo,
  reservation: reservation,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
