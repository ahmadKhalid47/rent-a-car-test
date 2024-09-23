import { NextResponse } from "next/server";
import { setTokenToCookies } from "@/app/registration/auth";

export async function POST(req: Request) {
  try {
    let { username, admin } = await req.json();
    return new Response(JSON.stringify({ error: null }), {
      headers: {
        "Set-Cookie": setTokenToCookies({ username, admin }),
      },
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
