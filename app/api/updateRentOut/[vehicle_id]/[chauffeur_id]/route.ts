import chauffeurModel from "@/app/models/chauffeur";
import connectDb from "@/app/models/connectDb";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { rentOut } = await req.json();
    let { vehicle_id, chauffeur_id } = await params.params;
    connectDb();
    await VehicleModel.updateOne(
      { _id: vehicle_id },
      { $set: { rentOut: rentOut } }
    );
    if (chauffeur_id) {
      await chauffeurModel.updateOne(
        { _id: chauffeur_id },
        { $set: { rentOut: rentOut } }
      );
    }
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
