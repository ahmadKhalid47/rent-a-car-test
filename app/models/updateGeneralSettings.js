import mongoose from "mongoose";

const updateGeneralSettingsSchema = mongoose.Schema(
  {
    currency: { type: String },
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
const updateGeneralSettingsModel =
  mongoose.models.updateGeneralSettings ||
  mongoose.model("updateGeneralSettings", updateGeneralSettingsSchema);

export default updateGeneralSettingsModel;
