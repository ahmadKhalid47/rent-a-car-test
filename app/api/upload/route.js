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
    const image = form.get("file");
    if (!image) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }
    const chunks = [];
    const imageStream = image.stream();
    for await (const chunk of imageStream) {
      chunks.push(chunk);
    }
    const imageBuffer = Buffer.concat(chunks);

    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ format: "png" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(imageBuffer);
    });

    const { secure_url: imageSecureUrl } = await uploadPromise;
    console.log(imageSecureUrl);
    return NextResponse.json({ message: "Post received" });
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
