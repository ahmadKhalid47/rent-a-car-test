import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setTokenToCookies } from "@/app/registration/auth";
import { isPlanExpired } from "@/app/Components/functions/formats";

export async function POST(req: Request) {
  async function verifyPassword(inputPassword: any, hashedPassword: any) {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  }
  try {
    let { username, password, rememberMe } = await req.json();
    connectDb();
    let loginData = await RegistrationModel.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!loginData) {
      return NextResponse.json({
        error: "User not found",
      });
    } else if (isPlanExpired(loginData.plan, loginData.createdAt)) {
      return NextResponse.json({
        error: "Your account is deactivated, please contact support",
      });
    } else {
      if (!(await verifyPassword(password, loginData.password))) {
        return NextResponse.json({
          error: "Incorrect password",
        });
      } else {
        return new Response(JSON.stringify({ error: null }), {
          headers: {
            "Set-Cookie": setTokenToCookies(
              { username, admin: loginData?.admin },
              rememberMe
            ),
          },
        });
      }
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: err,
    });
  }
}
