import mongoose from "mongoose";

const TypeSchema = mongoose.Schema(
  {
    Type: { type: String, required: true },
    exterior: { type: String, required: true },
    interior: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);
const TypeModel = mongoose.models.Type || mongoose.model("Type", TypeSchema);

export default TypeModel;
