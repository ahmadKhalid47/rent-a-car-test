import connectDb from "@/app/models/connectDb";
import CountryModel from "@/app/models/Country";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const data = await CountryModel.find().sort({ _id: -1 });
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
