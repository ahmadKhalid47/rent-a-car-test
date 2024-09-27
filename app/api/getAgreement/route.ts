import connectDb from "@/app/models/connectDb";
import updateAgreementModel from "@/app/models/updateAgreement";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const data = await updateAgreementModel.find();
    return NextResponse.json({ data });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json(
      {
        error: "Can't process your request at the moment",
      },
      { status: 500 }
    );
  }
}
