import mongoose from "mongoose";

const chauffeurSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
  },
  {
    timestamps: true,
  }
);


chauffeurSchema.index({ createdBy: 1 });

const chauffeurModel =
  mongoose.models.chauffeur || mongoose.model("chauffeur", chauffeurSchema);

export default chauffeurModel;
