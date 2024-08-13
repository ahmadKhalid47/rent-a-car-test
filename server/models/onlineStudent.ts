import mongoose, { Schema } from "mongoose";

const onlineStudentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    avatar: { type: String },
    title: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
    onlineCourses: [{ type: Schema.Types.ObjectId, ref: "OnlineCourse" }],
  },
  { timestamps: true }
);

const OnlineStudent = mongoose.model("OnlineStudent", onlineStudentSchema);
export default OnlineStudent;
