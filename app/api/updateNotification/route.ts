import connectDb from "@/app/models/connectDb";
import notificationSettingModel from "@/app/models/notificationSetting";
import { NextResponse } from "next/server";

const notificationFields: Record<string, string> = {
  newCar: "newCar",
  newChauffeur: "newChauffeur",
  newCustomer: "newCustomer",
  newReservation: "newReservation",
  reservationComplete: "reservationComplete",
  reservationPending: "reservationPending",
};

export async function POST(req: Request) {
  try {
    let { value, valueKey, createdBy } = await req.json();
    connectDb();
    const updateField = { [notificationFields[valueKey]]: value };
    await notificationSettingModel.updateOne(
      { createdBy },
      { $set: updateField },
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
