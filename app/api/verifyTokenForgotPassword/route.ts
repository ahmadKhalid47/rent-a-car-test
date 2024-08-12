import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let securityKey: any = process.env.SECURITY_KEY;
  const token: any = req.headers.get("token");

  jwt.verify(token, securityKey);
  return NextResponse.json({ msg: "verified" });
}
