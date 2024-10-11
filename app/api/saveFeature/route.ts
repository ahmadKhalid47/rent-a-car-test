import connectDb from "@/app/models/connectDb";
import FeatureModel from "@/app/models/Feature";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Feature, Icon, createdBy } = await req.json();
console.log(Icon);

    connectDb();
    await new FeatureModel({ Feature, Icon: Icon[0], createdBy }).save();
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
