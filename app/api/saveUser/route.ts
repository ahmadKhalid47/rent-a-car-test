import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let data = await req.json();
    console.log(data);

    connectDb();
    // await new MakeModel({ data }).save();
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
