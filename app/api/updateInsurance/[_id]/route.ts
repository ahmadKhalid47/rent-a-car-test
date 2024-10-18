import connectDb from "@/app/models/connectDb";
import InsuranceModel from "@/app/models/Insurance";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Insurance } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await InsuranceModel.updateOne({ _id: _id }, { $set: { Insurance: Insurance } });
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
