import mongoose from "mongoose";

const InsuranceSchema = mongoose.Schema(
  {
    Insurance: { type: String, required: true },
    recurring: { type: String, required: true },
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

InsuranceSchema.index({ createdBy: 1 });

const InsuranceModel = mongoose.models.Insurance || mongoose.model("Insurance", InsuranceSchema);

export default InsuranceModel;
