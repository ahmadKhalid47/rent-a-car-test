import connectDb from "@/app/models/connectDb";
import FeatureModel from "@/app/models/Feature";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: any) {
  try {
    let { _id } = await params.params;
    await connectDb();
    const data = await FeatureModel.deleteOne({ _id: _id });
    return NextResponse.json({
      acknowledged: data.acknowledged,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
