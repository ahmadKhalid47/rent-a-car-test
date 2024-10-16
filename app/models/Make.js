import mongoose from "mongoose";

const MakeSchema = mongoose.Schema(
  {
    make: { type: String, required: true },
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

MakeSchema.index({ createdBy: 1 });

const MakeModel = mongoose.models.Make || mongoose.model("Make", MakeSchema);

export default MakeModel;
