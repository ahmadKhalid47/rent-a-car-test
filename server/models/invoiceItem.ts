import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    qty: {
      type: Decimal128,
    },
    unitPrice: {
      type: Decimal128,
    },
    vat: {
      type: String,
    },
  },
  { timestamps: true }
);

const InvoiceItem = mongoose.model("InvoiceItem", invoiceItemSchema);
export default InvoiceItem;
