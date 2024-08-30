import connectDb from "@/app/models/connectDb";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { make, model } = await req.json();
    console.log(model);

    connectDb();
    await new ModelModel({ model, make }).save();
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
