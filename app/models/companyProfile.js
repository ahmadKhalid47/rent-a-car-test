import mongoose from "mongoose";

const companyProfileSchema = mongoose.Schema({
  profilePic: { type: String, required: true, default: "" },
});
const companyProfileModel =
  mongoose.models.companyProfile ||
  mongoose.model("companyProfile", companyProfileSchema);

export default companyProfileModel;
