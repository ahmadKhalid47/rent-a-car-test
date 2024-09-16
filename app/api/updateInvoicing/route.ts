import connectDb from "@/app/models/connectDb";
import updateInvoicingModel from "@/app/models/updateInvoicing";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Invoicing } = await req.json();

    connectDb();
    await updateInvoicingModel.updateOne({}, { $set: { data: Invoicing } });
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
