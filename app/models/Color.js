import mongoose from "mongoose";

const ColorSchema = mongoose.Schema(
  {
    Color: { type: String, required: true },
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
const ColorModel =
  mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default ColorModel;
