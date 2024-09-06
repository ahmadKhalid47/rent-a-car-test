import connectDb from "@/app/models/connectDb";
import CountryModel from "@/app/models/Country";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { country } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await CountryModel.updateOne(
      { _id: _id },
      { $set: { country: country } }
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
