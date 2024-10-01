import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { _ids } = await req.json();
    await connectDb();
    console.log(_ids);
      const data = await registrationModel.deleteMany({
        _id: { $in: _ids },
        admin: false,
      });
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
