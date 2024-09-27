import mongoose from "mongoose";

const chauffeurSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Assuming you have a User model
  },
  {
    timestamps: true,
  }
);

// Create an index on the createdBy field for faster search
chauffeurSchema.index({ createdBy: 1 });

const chauffeurModel =
  mongoose.models.chauffeur || mongoose.model("chauffeur", chauffeurSchema);

export default chauffeurModel;
