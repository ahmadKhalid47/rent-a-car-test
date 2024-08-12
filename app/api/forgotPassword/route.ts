import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { email } = await req.json();
    connectDb();
    let loginData = await RegistrationModel.findOne({
      email: email,
    });
    console.log(loginData);
    if (!loginData) {
      return NextResponse.json({
        error: "User not found with this email",
      });
    } else {
      return NextResponse.json({
        error: "Check your email for instructions to reset your password.",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
