import connectDb from "@/app/models/connectDb";
import ColorModel from "@/app/models/Color";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Color, ColorName, createdBy } = await req.json();
    console.log(Color, ColorName);
    connectDb();
    await new ColorModel({ Color, ColorName, createdBy }).save();
    return NextResponse.json({
      success: "User Created",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
