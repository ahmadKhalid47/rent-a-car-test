import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
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
const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export default CustomerModel;
