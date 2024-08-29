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

    // if (!files || files.length === 0) {
    //   return NextResponse.json(
    //     { message: "No files provided" },
    //     { status: 400 }
    //   );
    // }

    // Assuming each batch of `files` belongs to a particular damage section.
    const nestedFileUploads = [];
    let currentIndex = 0;

    // Rebuild the nested structure after upload
    for (let i = 0; i < JSON.parse(length1); i++) {
      const damageFiles = [];
      for (let j = 0; j < JSON.parse(length2[i]); j++) {
        const file = files[currentIndex];
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await cloudinary.v2.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          { folder: "uploads" }
        );

        damageFiles.push(result.secure_url);
        currentIndex++;
      }
      nestedFileUploads.push(damageFiles);
    }

    return NextResponse.json({ message: nestedFileUploads });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
