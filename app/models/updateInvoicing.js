import mongoose from "mongoose";

const updateInvoicingSchema = mongoose.Schema(
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

updateInvoicingSchema.index({ createdBy: 1 });
const updateInvoicingModel =
  mongoose.models.updateInvoicing || mongoose.model("updateInvoicing", updateInvoicingSchema);

export default updateInvoicingModel;
