import connectDb from "@/app/models/connectDb";
import updateAgreementModel from "@/app/models/updateAgreement";
import { NextResponse } from "next/server";

// Disable cache for this API route
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  try {
    await connectDb();
    const data = await updateAgreementModel.find();
    const response = NextResponse.json({ data });
    return response;
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
