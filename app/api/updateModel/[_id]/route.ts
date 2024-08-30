import connectDb from "@/app/models/connectDb";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Model } = await req.json();
    let { _id } = await params.params;
    connectDb();
    console.log(Model, _id);
    await ModelModel.updateOne({ _id: _id }, { $set: { Model: Model } });
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
