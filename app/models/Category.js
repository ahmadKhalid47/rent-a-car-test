import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    Category: { type: String, required: true },
    active: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ createdBy: 1 });

const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default CategoryModel;
