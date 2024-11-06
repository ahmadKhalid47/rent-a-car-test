import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    const { active, model } = await req.json();
    const { _id } = params.params;

    connectDb();

    // Dynamically import the model
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );

    if (!Model) {
      return NextResponse.json({ error: "Model not found" });
    }

    await Model.updateOne({ _id }, { $set: { active } });

    return NextResponse.json({ success: "User status updated" });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
