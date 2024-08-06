import mongoose from "mongoose";

export default async () => {
  await mongoose.connect(
    process.env.DATABASE_URL
  );
};
