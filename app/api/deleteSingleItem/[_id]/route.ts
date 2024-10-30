import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: any) {
  try {
    const { model } = await req.json(); // Get model name from the request body
    const { _id } = params.params; // Extract the _id from params
    await connectDb(); // Ensure the database is connected

    // Dynamically import the model based on the model name provided
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );

    // Delete the document using the dynamically imported model
    const data = await Model.deleteOne({ _id: _id });

    return NextResponse.json({
      acknowledged: data.acknowledged,
      message: `${model} deleted successfully`, // Confirmation message
    });
  } catch (err) {
    console.error("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
