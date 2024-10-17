import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { modelName, _id } = await req.json(); // Get modelName and _id from request body

    // Dynamically import the model based on the modelName
    const ModelModel = await import(`@/app/models/${modelName}`)
      .then((module) => module.default)
      .catch((err) => {
        console.error("Model import error: ", err);
        return null; // Handle model import error
      });

    if (!ModelModel) {
      return NextResponse.json(
        {
          error: "Model not found",
        },
        { status: 404 }
      );
    }

    await connectDb();

    // Delete the item from the specified model
    const data = await ModelModel.deleteOne({ _id });
    return NextResponse.json({
      acknowledged: data.acknowledged,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
