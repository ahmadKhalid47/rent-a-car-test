import mongoose from "mongoose";

const ModelSchema = mongoose.Schema(
  {
    model: { type: String, required: true },
    make: { type: String },
    Category: { type: String },
    active: { type: Boolean, default: true },
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
ModelSchema.index({ createdBy: 1 });
const ModelModel =
  mongoose.models.Model || mongoose.model("Model", ModelSchema);

export default ModelModel;
