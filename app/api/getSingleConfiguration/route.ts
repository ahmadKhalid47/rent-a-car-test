import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";
import RegistrationModel from "@/app/models/registration";

export async function POST(req: Request) {
  try {
    const { model, createdBy, sortField } = await req.json();

    if (!model || !createdBy) {
      return NextResponse.json(
        { error: "model and createdBy are required" },
        { status: 400 }
      );
    }

    await connectDb();
    const adminCheck = await RegistrationModel.findOne({ admin: true });

    // Dynamically import the specified model
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );

    // Set the sort object dynamically based on the provided sortField
    const sortOptions: any = {};
    if (sortField) {
      sortOptions[sortField] = 1; // Always sort in ascending order
    } else {
      sortOptions["ColorName"] = 1; // Default sorting by ColorName if no sortField is provided
    }

    const data = await Model.find({
      $or: [{ createdBy }, { createdBy: adminCheck._id }],
    })
      .collation({ locale: "en", strength: 2 }) // Case-insensitive collation
      .sort(sortOptions)
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
