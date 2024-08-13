import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  read: { type: Boolean, required: true, default: false },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
