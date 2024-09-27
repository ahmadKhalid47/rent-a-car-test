import mongoose from "mongoose";

const CitySchema = mongoose.Schema(
  {
    city: { type: String, required: true },
    country: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Assuming you have a User model
  },
  {
    timestamps: true, // Enable timestamps
  }
);

// Create an index on the createdBy field for faster search
CitySchema.index({ createdBy: 1 });

const CityModel = mongoose.models.City || mongoose.model("City", CitySchema);

export default CityModel;
