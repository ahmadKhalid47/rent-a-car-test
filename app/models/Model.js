import mongoose from "mongoose";

const ModelSchema = mongoose.Schema({
  model: { type: Object, required: true },
});
const ModelModel =
  mongoose.models.Model || mongoose.model("Model", ModelSchema);

export default ModelModel;
