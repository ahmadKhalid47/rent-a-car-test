import connectDb from "@/app/models/connectDb";
import reservationModel from "@/app/models/reservation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let data = await req.json();
    connectDb();
    await new reservationModel({
      data: data.reservation,
      createdBy: data.createdBy,
      vehicle_id: data.vehicle_id,
      chauffeur_id: data.chauffeur_id,
      customer_id: data.customer_id,
    }).save();
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
