import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { active, _ids, model } = await req.json();

    // Connect to the database
    connectDb();

    // Dynamically import the model based on the `model` parameter
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );

    // Check if Model was successfully imported
    if (!Model) {
      return NextResponse.json({
        error: "Invalid model specified",
      });
    }

    // Update multiple documents
    await Model.updateMany({ _id: { $in: _ids } }, { $set: { active } });

    return NextResponse.json({
      success: `${model}s updated successfully`,
    });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
