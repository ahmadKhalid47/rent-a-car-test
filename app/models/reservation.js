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
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.index({ createdBy: 1 });

const reservationModel =
  mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);

export default reservationModel;
