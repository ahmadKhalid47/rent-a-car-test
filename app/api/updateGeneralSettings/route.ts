import connectDb from "@/app/models/connectDb";
import updateGeneralSettingsModel from "@/app/models/updateGeneralSettings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let {currency}  = await req.json();
    console.log(currency);

    connectDb();
    await updateGeneralSettingsModel.updateOne(
      {},
      { $set: { currency: currency } }
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
