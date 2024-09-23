import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { user } = await params.params;
    console.log("user", user);

    await connectDb();
    const data = await registrationModel.findOne({
      $or: [{ username: user }, { email: user }],
    });
    console.log(data);

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
