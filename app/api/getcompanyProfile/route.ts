import connectDb from "@/app/models/connectDb";
import companyProfileModel from "@/app/models/companyProfile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const data = await companyProfileModel.findOne({});
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