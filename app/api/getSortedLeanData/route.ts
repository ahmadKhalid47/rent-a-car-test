import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { createdBy, modelName } = await req.json();

    if (!createdBy || !modelName) {
      return NextResponse.json(
        { error: "createdBy and modelName are required" },
        { status: 400 }
      );
    }

    // Dynamically import the model based on the modelName
    const Model = await import(`@/app/models/${modelName}`)
      .then((mod) => mod.default)
      .catch((err) => {
        return NextResponse.json(
          { error: `Failed to load model: ${modelName}` },
          { status: 400 }
        );
      });

    if (!Model) {
      return NextResponse.json(
        { error: `Model not found for: ${modelName}` },
        { status: 400 }
      );
    }

    await connectDb();
    const data = await Model.find({ createdBy }).sort({ _id: -1 }).lean();

    return NextResponse.json({ data });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json(
      { error: "Can't process your request at the moment" },
      { status: 500 }
    );
  }
}
