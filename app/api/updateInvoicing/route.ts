import connectDb from "@/app/models/connectDb";
import updateInvoicingModel from "@/app/models/updateInvoicing";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { Invoicing, createdBy } = await req.json();

    connectDb();
    await updateInvoicingModel.updateOne(
      { createdBy },
      { $set: { data: Invoicing } },
      { upsert: true }
    );
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
