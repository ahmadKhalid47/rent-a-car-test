import connectDb from "@/app/models/connectDb";
import TypeModel from "@/app/models/Type";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Type } = await req.json();
    let { _id } = await params.params;
    connectDb();
    console.log(Type, _id);
    await TypeModel.updateOne({ _id: _id }, { $set: { Type: Type } });
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