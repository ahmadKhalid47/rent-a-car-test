import connectDb from "@/app/models/connectDb";
import OwnershipModel from "@/app/models/Ownership";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Ownership, createdBy } = await req.json();

    connectDb();
    await new OwnershipModel({ Ownership, createdBy }).save();
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
