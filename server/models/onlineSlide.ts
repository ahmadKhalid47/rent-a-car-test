import mongoose from "mongoose";

const onlineSlideSchema = new mongoose.Schema(
  {
    text: String,
    picture: String,
    audioLink: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const OnlineSlide = mongoose.model("OnlineSlide", onlineSlideSchema);
export default OnlineSlide;
