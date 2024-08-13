import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const onlineCourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    //   price: { type: Number, required: true },
    price: { type: Decimal128, required: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "OnlineModule" }],
  },
  { timestamps: true }
);

const OnlineCourse = mongoose.model("OnlineCourse", onlineCourseSchema);
export default OnlineCourse;
