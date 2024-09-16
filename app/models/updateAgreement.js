import mongoose from "mongoose";

const updateAgreementSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const updateAgreementModel =
  mongoose.models.updateAgreement || mongoose.model("updateAgreement", updateAgreementSchema);

export default updateAgreementModel;
