import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    data: { type: Object },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const reservationModel =
  mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);

export default reservationModel;
