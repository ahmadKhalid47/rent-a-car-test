import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    dob: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
