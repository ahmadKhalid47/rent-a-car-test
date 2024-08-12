import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import RegistrationModel from "@/app/models/registration";

export async function GET(req: Request) {
  let securityKey: any = process.env.SECURITY_KEY;
  const token: any = req.headers.get("token");
  let loginData = await RegistrationModel.findOne({
    fptoken: token,
  });
  if (loginData) {
    jwt.verify(token, securityKey); 
    return NextResponse.json({ msg: "verified" });
  }
}
