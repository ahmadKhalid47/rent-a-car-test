// import connectDb from "@/app/models/connectDb";
// import ModelModel from "@/app/models/Model";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     await connectDb();
//     const data = await ModelModel.find().sort({ _id: -1 });
//     return NextResponse.json({
//       data,
//     });
//   } catch (err) {
//     console.log("err: ", err);
//     return NextResponse.json({
//       error: "Can't process your request at the moment",
//     });
//   }
// }


import connectDb from "@/app/models/connectDb";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const data = await ModelModel.find().sort({ _id: -1 });
    const response = NextResponse.json({
      data,
    });
    response.headers.set("Cache-Control", "no-store"); // Ensuring the response is not cached
    return response;
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
