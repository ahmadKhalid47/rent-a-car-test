import connectDb from "@/app/models/connectDb";
import CategoryModel from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Category, createdBy } = await req.json();

    connectDb();
    await new CategoryModel({ Category, createdBy }).save();
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
