import mongoose from "mongoose";

const RegistrationSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  fptoken: { type: String },
  others: { type: Object },
});
const RegistrationModel =
  mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);

export default RegistrationModel;
