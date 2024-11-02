import connectDb from "@/app/models/connectDb";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { active, _ids } = await req.json(); 
    connectDb();
console.log(active, _ids);
    
    await VehicleModel.updateMany(
      { _id: { $in: _ids } },
      { $set: { active: active } }
    );

    return NextResponse.json({
      success: "Vehicles updated successfully",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
