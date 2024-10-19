import connectDb from "@/app/models/connectDb";
import FeatureModel from "@/app/models/Feature";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Feature, Icon, Box, createdBy } = await req.json();

    connectDb();
    await new FeatureModel({ Feature, Icon: Icon[0], Box, createdBy }).save();
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
