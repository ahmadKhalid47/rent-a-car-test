import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { _ids } = await req.json();
    await connectDb();
    console.log(_ids);
    if (_ids === "all") {
      const data = await MakeModel.deleteMany();
    } else {
      const data = await MakeModel.deleteMany({ _id: { $in: _ids } });
    }
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
