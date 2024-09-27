import connectDb from "@/app/models/connectDb";
import CustomerModel from "@/app/models/customer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let Customer = await req.json();
    let {createdBy} = await req.json();

    connectDb();
    await new CustomerModel({ data: Customer, createdBy }).save();
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
