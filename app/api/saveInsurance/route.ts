import connectDb from "@/app/models/connectDb";
import InsuranceModel from "@/app/models/Insurance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Insurance, recurring, createdBy } = await req.json();

    connectDb();
    await new InsuranceModel({ Insurance, recurring, createdBy }).save();
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
