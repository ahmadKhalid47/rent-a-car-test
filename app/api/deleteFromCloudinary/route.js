import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcdynkm5d",
  api_key: "157745433978489",
  api_secret: "AqvKiU623z4vCZStGiBvBgk-2vQ",
});

// DELETE request handler with batch deletion
export async function DELETE(req) {
  try {
    // Parse the request body
    const files = await req.json();
    console.log("files", files);
    // Extract the public_ids from the file URLs
    const publicIds = files.map((fileUrl) => {
      const splitUrl = fileUrl.split("/");
      const publicIdWithExtension = splitUrl[splitUrl.length - 1];
      const publicId = publicIdWithExtension.split(".")[0];
      return `uploads/${publicId}`;
    });
    console.log(publicIds);
    // Batch delete the files from Cloudinary
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    console.log("result", result);
    // Return success response
    return NextResponse.json({ message: "Files deleted" });
  } catch (error) {
    console.log(error);
    // Return error response
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
