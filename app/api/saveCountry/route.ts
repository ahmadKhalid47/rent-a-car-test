import connectDb from "@/app/models/connectDb";
import CountryModel from "@/app/models/Country";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { country, createdBy } = await req.json();

    connectDb();
    await new CountryModel({ country, createdBy }).save();
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
