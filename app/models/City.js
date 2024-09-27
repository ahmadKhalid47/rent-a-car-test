import mongoose from "mongoose";

const CitySchema = mongoose.Schema(
  {
    city: { type: String, required: true },
    country: { type: String },
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

CitySchema.index({ createdBy: 1 });

const CityModel = mongoose.models.City || mongoose.model("City", CitySchema);

export default CityModel;
