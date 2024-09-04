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
    const length1 = form.getAll("length1");
    const length2 = form.getAll("length2");
    console.log("files", files);
    console.log("length1", length1);
    console.log("length2", length2);
    const nestedFileUploads = [];
    let currentIndex = 0;

    for (let i = 0; i < JSON.parse(length1); i++) {
      const damageFiles = [];

      for (let j = 0; j < JSON.parse(length2[i]); j++) {
        const file = files[currentIndex];

        if (typeof file === "string" && file.startsWith("http")) {
          // If it's a URL, push it directly
          damageFiles.push(file);
        } else if (file instanceof File) {
          // If it's a file, upload it to Cloudinary
          const buffer = Buffer.from(await file.arrayBuffer());
          const result = await cloudinary.v2.uploader.upload(
            `data:${file.type};base64,${buffer.toString("base64")}`,
            { folder: "uploads" }
          );
          damageFiles.push(result.secure_url);
        } else {
          throw new Error("Unsupported data type");
        }

        currentIndex++;
      }

      nestedFileUploads.push(damageFiles);
    }

    console.log(nestedFileUploads);
    return NextResponse.json({ message: nestedFileUploads });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
