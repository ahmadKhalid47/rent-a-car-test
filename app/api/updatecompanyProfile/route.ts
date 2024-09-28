import connectDb from "@/app/models/connectDb";
import companyProfileModel from "@/app/models/companyProfile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { profilePic, profilePic2, createdBy } = await req.json();
    connectDb();
    await companyProfileModel.updateOne(
      { createdBy },
      { $set: { profilePic: profilePic, profilePic2: profilePic2 } },
      { upsert: true }
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
