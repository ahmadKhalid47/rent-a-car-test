import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,});

export async function DELETE(req) {
  try {
    const files = await req.json();
    const publicIds = files.map((fileUrl) => {
      const splitUrl = fileUrl.split("/");
      const publicIdWithExtension = splitUrl[splitUrl.length - 1];
      const publicId = publicIdWithExtension.split(".")[0];
      return `uploads/${publicId}`;
    });
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    return NextResponse.json({ message: "Files deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
