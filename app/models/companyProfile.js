import mongoose from "mongoose";

const companyProfileSchema = mongoose.Schema(
  {
    profilePic: { type: Array, required: true, default: "" },
    profilePic2: { type: Array, required: true, default: "" },
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
const companyProfileModel =
  mongoose.models.companyProfile ||
  mongoose.model("companyProfile", companyProfileSchema);

export default companyProfileModel;
