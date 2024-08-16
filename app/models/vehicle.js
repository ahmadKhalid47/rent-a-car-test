import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema({
  data: { type: Object },
});
const VehicleModel =
  mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default VehicleModel;
