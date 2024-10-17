import connectDb from "@/app/models/connectDb";
import ColorModel from "@/app/models/Color";
import { NextResponse } from "next/server";
import RegistrationModel from "@/app/models/registration";

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
    const adminCheck = await RegistrationModel.findOne({ admin: true });

    const data = await ColorModel.find({
      $or: [{ createdBy }, { createdBy: adminCheck._id }],
    })
      .collation({ locale: "en", strength: 2 }) // Case-insensitive collation
      .sort({ ColorName: 1 })
      .lean();

    return NextResponse.json({
      data,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
