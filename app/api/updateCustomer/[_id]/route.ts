import connectDb from "@/app/models/connectDb";
import CustomerModel from "@/app/models/customer";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let Customer = await req.json();
    let { _id } = await params.params;
    connectDb();
    await CustomerModel.updateOne({ _id: _id }, { $set: { data: Customer } });
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