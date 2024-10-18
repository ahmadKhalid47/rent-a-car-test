import mongoose from "mongoose";

const OwnershipSchema = mongoose.Schema(
  {
    Ownership: { type: String, required: true },
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

OwnershipSchema.index({ createdBy: 1 });

const OwnershipModel = mongoose.models.Ownership || mongoose.model("Ownership", OwnershipSchema);

export default OwnershipModel;
