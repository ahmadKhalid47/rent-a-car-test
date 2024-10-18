import connectDb from "@/app/models/connectDb";
import InsuranceModel from "@/app/models/Insurance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { _ids } = await req.json();
    await connectDb();
    await InsuranceModel.deleteMany({ _id: { $in: _ids } });
    return NextResponse.json({
      acknowledged: "data.acknowledged",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
