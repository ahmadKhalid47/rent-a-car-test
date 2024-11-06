import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Global from "./Global";
import myProfile from "./myProfile";
import userProfile from "./userProfile";
import Vehicle from "./Vehicle";
import VehicleInfo from "./vehicleInfo";
import Configurations from "./Configurations";
import Customer from "./Customer";
import CustomerInfo from "./Customerinfo";
import chauffeur from "./chauffeur";
import chauffeurInfo from "./chauffeurInfo";
import UserInfo from "./UserInfo";
import reservation from "./reservations";
import reservationInfo from "./reservationInfo";
import Invoicing from "./Invoicing";
import Agreement from "./Agreement";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  Global: Global,
  myProfile: myProfile,
  userProfile: userProfile,
  Vehicle: Vehicle,
  VehicleInfo: VehicleInfo,
  Configurations: Configurations,
  Customer: Customer,
  CustomerInfo: CustomerInfo,
  chauffeur: chauffeur,
  chauffeurInfo: chauffeurInfo,
  UserInfo: UserInfo,
  reservation: reservation,
  reservationInfo: reservationInfo,
  Invoicing: Invoicing,
  Agreement: Agreement,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
