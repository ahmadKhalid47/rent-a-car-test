import mongoose from "mongoose";

const MakeSchema = mongoose.Schema(
  {
    make: { type: String, required: true },
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


MakeSchema.index({ createdBy: 1 });

const MakeModel = mongoose.models.Make || mongoose.model("Make", MakeSchema);

export default MakeModel;
