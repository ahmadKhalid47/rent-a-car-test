import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { model, data } = await req.json();

    if (!model || !data) {
      return NextResponse.json(
        { error: "Model and data are required" },
        { status: 400 }
      );
    }

    await connectDb();

    // Dynamically import the specified model
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );

    // Create a new document using the provided data
    const newDocument = new Model(data);
    await newDocument.save();

    return NextResponse.json({
      success: `${model} created successfully`,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
