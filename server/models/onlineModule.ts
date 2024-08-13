import mongoose from "mongoose";

const onlineModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slides: [{ type: mongoose.Schema.Types.ObjectId, ref: "OnlineSlide" }],
  },
  { timestamps: true }
);

const OnlineModule = mongoose.model("OnlineModule", onlineModuleSchema);
export default OnlineModule;
