import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import { setTokenToCookies } from "@/app/registration/auth";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  // let securityKey: any = process.env.SECURITY_KEY;
  console.log("req", req);
  try {
    let { username, password } = await req.json();
    let userData = { username, password };
    console.log(userData);
    connectDb();
    let loginData = await RegistrationModel.find()
    console.log(loginData);
    // if (loginData) {
    //   if (password !== loginData.password) {
    //     return NextResponse.json({ error: "Incorrect Password" });
    //   } else {
    //     jwt.sign(userData, securityKey, { expiresIn: "1h" });
    //     let dataToSend = { msg: "token", userId: loginData._id };
    //     return new Response(JSON.stringify(dataToSend), {
    //       headers: { "Set-Cookie": setTokenToCookies(userData) },
    //     });
    //   }
    // } else {
      return NextResponse.json({ error: "User not found" });
    // }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "can't process your request at the moment",
    });
  }
}
