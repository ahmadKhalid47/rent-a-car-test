import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
    rentOut: { type: Boolean, default: false },
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
VehicleSchema.index({ createdBy: 1 });
const VehicleModel =
  mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default VehicleModel;
