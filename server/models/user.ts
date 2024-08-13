import mongoose from "mongoose";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  avatar: string;
  role: string;
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    dob: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "invigilator",
      enum: ["hoc", "admin", "invigilator", "iqa", "eqa", "teacher"],
    },
    iqaReport: {
      type: String,
    },
    iqaReportMimeType: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
