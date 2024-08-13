import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    dob: {
      type: String,
    },
    issueDate: {
      type: String,
    },
    refNumber: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    certificate: {
      type: String,
    },
    id1: {
      type: String,
    },
    id1MimeType: {
      type: String,
    },
    id2: {
      type: String,
    },
    id2MimeType: {
      type: String,
    },
    other: {
      type: String,
    },
    otherMimeType: {
      type: String,
    },
    video1: {
      type: String,
    },
    video2: {
      type: String,
    },
    videoOther: {
      type: String,
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
