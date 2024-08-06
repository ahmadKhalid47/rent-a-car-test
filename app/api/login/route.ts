import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // let { username, password } = await req.json();
    // let userData = { username, password };
    let userData = await req.json();
    console.log(userData);
    connectDb();
    let loginData = await RegistrationModel.find();
    console.log(loginData);
    return NextResponse.json({ error: "User not found" });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "can't process your request at the moment",
    });
  }
}
