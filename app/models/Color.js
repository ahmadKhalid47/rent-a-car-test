import mongoose from "mongoose";

const ColorSchema = mongoose.Schema(
  {
    Color: { type: String, required: true },
    ColorName: { type: String, required: true },
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
ColorSchema.index({ createdBy: 1 });;
const ColorModel =
  mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default ColorModel;
