import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
    rentOut: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
  }
);
const VehicleModel =
  mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default VehicleModel;
