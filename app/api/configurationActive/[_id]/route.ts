import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    const { model, active } = await req.json();
    const { _id } = params.params;
    connectDb();
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );
    await Model.updateOne({ _id: _id }, { $set: { active: active } });
    return NextResponse.json({
      success: `${model} updated successfully`,
    });
  } catch (err) {
    console.error("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
