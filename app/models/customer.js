import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export default CustomerModel;
