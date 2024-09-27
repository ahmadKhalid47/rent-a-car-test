import mongoose from "mongoose";

const CountrySchema = mongoose.Schema(
  {
    country: { type: String, required: true },
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

CountrySchema.index({ createdBy: 1 });

const CountryModel =
  mongoose.models.Country || mongoose.model("Country", CountrySchema);

export default CountryModel;
