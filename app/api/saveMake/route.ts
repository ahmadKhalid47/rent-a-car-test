import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { make, createdBy } = await req.json();
    console.log(make, createdBy);

    connectDb();
    await new MakeModel({ make, createdBy }).save();
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
