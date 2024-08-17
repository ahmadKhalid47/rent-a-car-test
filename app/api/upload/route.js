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
      const chunks = [];
      const fileStream = file.stream();
      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ format: "png" }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          })
          .end(fileBuffer);
      });

      return await uploadPromise;
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    return NextResponse.json({ message: uploadedFiles });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const selectedImage = formData.get("file");
//     console.log(selectedImage);
//     await cloudinary.uploader.upload(selectedImage);
//     return NextResponse.json({ success: "success" }, { status: 500 });
//   } catch (error) {
//     console.error("Failed to upload file:", error);
//     return NextResponse.json(
//       { error: "Failed to upload file" },
//       { status: 500 }
//     );
//   }
// }
