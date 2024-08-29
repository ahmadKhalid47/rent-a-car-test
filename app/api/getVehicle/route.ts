import connectDb from "@/app/models/connectDb";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const data = await VehicleModel.find();
    return NextResponse.json(
      {
        data,
      },
      {
        headers: {
          "Cache-Control": "no-store", // Prevents caching of the response
        },
      }
    );
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
