import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { _id } = await params.params;
    await connectDb();
    const userData: any = await registrationModel.findOne({ _id: _id }).lean();
    let data = {
      ...userData,
      profilePic: [userData.profilePic],
    };
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
