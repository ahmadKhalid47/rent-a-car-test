import mongoose from "mongoose";

const CitySchema = mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String },
});
const CityModel =
  mongoose.models.City || mongoose.model("City", CitySchema);

export default CityModel;
