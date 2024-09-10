import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const data = await MakeModel.find().sort({ _id: -1 });

    const response = NextResponse.json({
      data,
    });

    // Disable cache
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
