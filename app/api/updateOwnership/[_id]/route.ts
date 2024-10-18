import connectDb from "@/app/models/connectDb";
import OwnershipModel from "@/app/models/Ownership";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Ownership } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await OwnershipModel.updateOne({ _id: _id }, { $set: { Ownership: Ownership } });
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
