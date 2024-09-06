import connectDb from "@/app/models/connectDb";
import CityModel from "@/app/models/City";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { country, city } = await req.json();

    connectDb();
    await new CityModel({ city, country }).save();
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
