import connectDb from "@/app/models/connectDb";
import updateAgreementModel from "@/app/models/updateAgreement";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Agreement } = await req.json();

    connectDb();
    await updateAgreementModel.updateOne({}, { $set: { data: Agreement } });
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
