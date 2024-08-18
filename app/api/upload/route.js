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

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files provided" },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload file to Cloudinary
      const result = await cloudinary.v2.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        { folder: "uploads" } // Optional: specify folder or other options
      );
      return result.secure_url;
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
