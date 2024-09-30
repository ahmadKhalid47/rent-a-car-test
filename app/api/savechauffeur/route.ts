import connectDb from "@/app/models/connectDb";
import chauffeurModel from "@/app/models/chauffeur";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let data = await req.json();
    connectDb();
    await new chauffeurModel({
      data: data.chauffeur,
      createdBy: data.createdBy,
    }).save();
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
