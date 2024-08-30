import mongoose from "mongoose";

const MakeSchema = mongoose.Schema({
  make: { type: String, required: true },
});
const MakeModel =
  mongoose.models.Make || mongoose.model("Make", MakeSchema);

export default MakeModel;
