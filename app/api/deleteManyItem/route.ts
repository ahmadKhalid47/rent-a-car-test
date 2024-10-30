import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get model name and ids from the request body
    const { model, _ids } = await req.json();
    await connectDb(); // Ensure the database is connected
console.log(model, _ids);

    // Dynamically import the model based on the model name provided
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );

    // Delete the documents using the dynamically imported model
    const data = await Model.deleteMany({ _id: { $in: _ids } });

    return NextResponse.json({
      acknowledged: data.acknowledged,
      message: `${model} deleted successfully`, // Confirmation message
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
