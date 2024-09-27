import connectDb from "@/app/models/connectDb";
import notificationSettingModel from "@/app/models/notificationSetting";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    connectDb();
    let data = await notificationSettingModel.findOne().lean();
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
