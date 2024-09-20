import mongoose from "mongoose";

const updateGeneralSettingsSchema = mongoose.Schema(
  {
    currency: { type: Object },
  },
  {
    timestamps: true,
  }
);
const updateGeneralSettingsModel =
  mongoose.models.updateGeneralSettings ||
  mongoose.model("updateGeneralSettings", updateGeneralSettingsSchema);

export default updateGeneralSettingsModel;
