import connectDb from "@/app/models/connectDb";
import FeatureModel from "@/app/models/Feature";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Feature } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await FeatureModel.updateOne({ _id: _id }, { $set: { Feature: Feature } });
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
