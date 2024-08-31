import connectDb from "@/app/models/connectDb";
import ColorModel from "@/app/models/Color";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Color } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await ColorModel.updateOne({ _id: _id }, { $set: { Color: Color } });
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
