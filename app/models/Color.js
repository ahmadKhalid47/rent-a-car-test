import mongoose from "mongoose";

const ColorSchema = mongoose.Schema(
  {
    Color: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);
const ColorModel =
  mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default ColorModel;
