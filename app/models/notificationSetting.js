import mongoose from "mongoose";

const notificationSettingSchema = mongoose.Schema({
  newCar: { type: Boolean, default: true },
  newChauffeur: { type: Boolean, default: true },
  newCustomer: { type: Boolean, default: true },
  newReservation: { type: Boolean, default: true },
  reservationComplete: { type: Boolean, default: true },
  reservationPending: { type: Boolean, default: true },
});
const notificationSettingModel =
  mongoose.models.notificationSetting ||
  mongoose.model("notificationSetting", notificationSettingSchema);

export default notificationSettingModel;
