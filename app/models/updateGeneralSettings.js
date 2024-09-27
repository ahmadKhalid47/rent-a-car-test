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

updateGeneralSettingsSchema.index({ createdBy: 1 });

const updateGeneralSettingsModel =
  mongoose.models.updateGeneralSettings ||
  mongoose.model("updateGeneralSettings", updateGeneralSettingsSchema);

export default updateGeneralSettingsModel;
