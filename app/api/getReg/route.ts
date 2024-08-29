import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    connectDb();
    const data = await RegistrationModel.find();
    const data2 = await VehicleModel.find();
    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    headers.set("Expires", "0");
    headers.set("Pragma", "no-cache");
    headers.set("Surrogate-Control", "no-store");

    return new NextResponse(JSON.stringify(data2), { headers, status: 200 });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
