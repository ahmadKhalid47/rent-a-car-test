import connectDb from "@/app/models/connectDb";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let vehicle = await req.json();
    connectDb();
    console.log(vehicle);
    await new VehicleModel({data:vehicle}).save();
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
