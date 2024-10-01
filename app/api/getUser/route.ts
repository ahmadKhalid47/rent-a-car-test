import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { createdBy } = await req.json();

    if (!createdBy) {
      return NextResponse.json(
        { error: "createdBy is required" },
        { status: 400 }
      );
    }
    await connectDb();
    const adminCheck = await registrationModel.findOne({ _id: createdBy });

    if (!adminCheck) {
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        { status: 401 }
      );
    }

    const data = await registrationModel
      .find({ admin: false })
      .sort({ _id: -1 })
      .lean();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error processing request: ", err);
    return NextResponse.json(
      {
        error: "Can't process your request at the moment",
      },
      { status: 500 }
    );
  }
}
