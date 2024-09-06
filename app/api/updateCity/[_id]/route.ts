import connectDb from "@/app/models/connectDb";
import CityModel from "@/app/models/City";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { country, city } = await req.json();
    let { _id } = await params.params;
    connectDb();
    console.log(country, _id, city);
    await CityModel.updateOne(
      { _id: _id },
      { $set: { country: country, city: city } }
    );
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
