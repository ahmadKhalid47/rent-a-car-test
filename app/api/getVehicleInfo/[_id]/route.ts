import connectDb from "@/app/models/connectDb";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: any) {
  try {
    let { _id } = await params.params;
    await connectDb();
    const data = await VehicleModel.findOne({ _id: _id });
    return NextResponse.json({
      data,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
