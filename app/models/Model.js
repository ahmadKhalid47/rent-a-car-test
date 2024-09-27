import mongoose from "mongoose";

const ModelSchema = mongoose.Schema(
  {
    model: { type: String, required: true },
    make: { type: String },
  },
  {
    timestamps: true, 
  }
);
const ModelModel =
  mongoose.models.Model || mongoose.model("Model", ModelSchema);

export default ModelModel;
