import connectDb from "@/app/models/connectDb";
import TypeModel from "@/app/models/Type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let {Type} = await req.json();
    console.log(Type);

    connectDb();
    await new TypeModel({ Type }).save();
    return NextResponse.json({
      success: "User Created",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
