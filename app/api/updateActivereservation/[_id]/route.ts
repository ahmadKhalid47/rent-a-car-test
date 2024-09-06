import connectDb from "@/app/models/connectDb";
import reservationModel from "@/app/models/reservation";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { active } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await reservationModel.updateOne({ _id: _id }, { $set: { active: active } });
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
