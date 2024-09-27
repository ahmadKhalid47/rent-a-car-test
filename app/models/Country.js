import mongoose from "mongoose";

const CountrySchema = mongoose.Schema(
  {
    country: { type: String, required: true },
  },
  {
    timestamps: true, // Enable timestamps
  }
);
const CountryModel =
  mongoose.models.Country || mongoose.model("Country", CountrySchema);

export default CountryModel;
