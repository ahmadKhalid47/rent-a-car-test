import mongoose from "mongoose";

const updateInvoicingSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const updateInvoicingModel =
  mongoose.models.updateInvoicing || mongoose.model("updateInvoicing", updateInvoicingSchema);

export default updateInvoicingModel;
