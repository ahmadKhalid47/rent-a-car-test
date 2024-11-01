import connectDb from "@/app/models/connectDb";
import reservationModel from "@/app/models/reservation";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let data = await req.json();
    let { _id } = await params.params;
    connectDb();
    let ack= await reservationModel.updateOne(
      { _id: _id },
      {
        $set: {
          data: data.reservation,
          vehicle_id: data.vehicle_id,
          chauffeur_id: data.chauffeur_id,
          customer_id: data.customer_id,
        },
      }
    );
    console.log("ack_____________", data);
    
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
