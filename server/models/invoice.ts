import { Decimal128, ObjectId } from "mongodb";
import mongoose from "mongoose";
import counterModel from "./counter";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceDate: {
      type: String,
    },
    invoiceNumber: {
      type: String,
      unique: true,
    },
    lessAmountPaid: {
      type: Decimal128,
    },
    amountDue: {
      type: Decimal128,
    },
    amountPaying: {
      type: Decimal128,
    },
    invoiceItems: [{ type: ObjectId, ref: "InvoiceItem" }],
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await counterModel.findByIdAndUpdate(
      { _id: "invoiceNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const paddedSeq = String(counter.seq).padStart(4, "0");
    this.invoiceNumber = `INV-${paddedSeq}`;
  }
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
