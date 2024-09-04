import connectDb from "@/app/models/connectDb";
import chauffeurModel from "@/app/models/chauffeur";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let chauffeur = await req.json();
    let { _id } = await params.params;
    connectDb();
    await chauffeurModel.updateOne({ _id: _id }, { $set: { data: chauffeur } });
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
