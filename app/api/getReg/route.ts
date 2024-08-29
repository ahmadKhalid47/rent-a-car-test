import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const data = await RegistrationModel.find();
    const data2 = await VehicleModel.find();
    return NextResponse.json({
      data,
      data2,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
