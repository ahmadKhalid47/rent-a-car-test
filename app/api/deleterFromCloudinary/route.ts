// // pages/api/deleteImages.ts
// import { NextRequest, NextResponse } from "next/server";
// import { deleteImages } from "@/lib/cloudinary";

// export async function POST(request: NextRequest) {
//   try {
//     const { imageUrls } = await request.json();

//     if (
//       !Array.isArray(imageUrls) ||
//       !imageUrls.every((url) => typeof url === "string")
//     ) {
//       return NextResponse.json(
//         { message: "Invalid image URLs" },
//         { status: 400 }
//       );
//     }

//     await deleteImages(imageUrls);
//     return NextResponse.json({ message: "Images deleted successfully" });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { message: "Failed to delete images" },
//       { status: 500 }
//     );
//   }
// }
