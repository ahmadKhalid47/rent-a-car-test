import connectDb from "@/app/models/connectDb";
import updateGeneralSettingsModel from "@/app/models/updateGeneralSettings";
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
    const data = await updateGeneralSettingsModel
      .find({ createdBy })
      .sort({ _id: -1 })
      .lean();
    console.log(data);
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
