import mongoose from "mongoose";

const chauffeurSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const chauffeurModel =
  mongoose.models.chauffeur || mongoose.model("chauffeur", chauffeurSchema);

export default chauffeurModel;
