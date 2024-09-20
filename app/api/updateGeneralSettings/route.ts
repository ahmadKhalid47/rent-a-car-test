import connectDb from "@/app/models/connectDb";
import updateGeneralSettingsModel from "@/app/models/updateGeneralSettings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { selectedCurrency } = await req.json();
    console.log(selectedCurrency);

    connectDb();
    // await updateGeneralSettingsModel.updateOne(
    //   {},
    //   { $set: { currency: selectedCurrency } }
    // );
    await new updateGeneralSettingsModel({ currency: selectedCurrency }).save();
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
