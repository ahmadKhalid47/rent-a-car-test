import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    data: { type: Object },
    status: { type: String, default: "inComplete" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const reservationModel =
  mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);

export default reservationModel;
