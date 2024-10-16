import mongoose from "mongoose";

const FeatureSchema = mongoose.Schema(
  {
    Feature: { type: String, required: true },
    Icon: { type: String, required: false },
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
FeatureSchema.index({ createdBy: 1 });;
const FeatureModel =
  mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);

export default FeatureModel;
