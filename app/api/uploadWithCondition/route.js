import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { Buffer } from "buffer";

cloudinary.config({
  cloud_name: "dcdynkm5d",
  api_key: "157745433978489",
  api_secret: "AqvKiU623z4vCZStGiBvBgk-2vQ",
});

export async function POST(req) {
  try {
    const form = await req.formData();
    const files = form.getAll("files");
    console.log(files);

    const uploadPromises = files.map(async (item) => {
      if (typeof item === "string" && item.startsWith("http")) {
        // If it's a URL, just return it
        return item;
      } else if (item instanceof File) {
        // If it's a file, upload to Cloudinary
        const buffer = Buffer.from(await item.arrayBuffer());
        const result = await cloudinary.v2.uploader.upload(
          `data:${item.type};base64,${buffer.toString("base64")}`,
          { folder: "uploads" }
        );
        return result.secure_url;
      } else {
        throw new Error("Unsupported data type");
      }
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json({ message: uploadedFiles });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
