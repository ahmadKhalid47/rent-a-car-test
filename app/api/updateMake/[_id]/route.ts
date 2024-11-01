import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { make, Category } = await req.json();
    let { _id } = await params.params;
    connectDb();
    const MakeData = await MakeModel.findOne({ _id: _id });
    await MakeModel.updateOne(
      { _id: _id },
      { $set: { make: make, Category: Category } }
    );
    await ModelModel.updateMany(
      { make: MakeData.make },
      { $set: { make: make } }
    );
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
