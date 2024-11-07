import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { modelName, _id } = await req.json(); // Getting modelName and _id from the body

    // Dynamically import the model based on the modelName
    const Model = await import(`@/app/models/${modelName}`).then(
      (mod) => mod.default
    );

    if (!Model) {
      return NextResponse.json({
        error: "Model not found",
      });
    }

    await connectDb();
    const data = await Model.findOne({ _id }).lean();

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
