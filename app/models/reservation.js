import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const reservationModel =
  mongoose.models.reservation || mongoose.model("reservation", reservationSchema);

export default reservationModel;
