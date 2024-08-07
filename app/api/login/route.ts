import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setTokenToCookies } from "@/app/registration/auth";

export async function POST(req: Request) {
  try {
    let { username, password } = await req.json();
    connectDb();
    let loginData = await RegistrationModel.findOne({
      $or: [{ username: username }, { email: username }],
    });
    console.log(loginData);
    if (!loginData) {
      return NextResponse.json({
        error: "User Not Found",
      });
    } else {
      if (loginData.password !== password) {
        return NextResponse.json({
          error: "Incorrect Password",
        });
      } else {
        return new Response(JSON.stringify({ error: null }), {
          headers: {
            "Set-Cookie": setTokenToCookies({ username, password }),
          },
        });
      }
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't Process Your Request At The Moment",
    });
  }
}
