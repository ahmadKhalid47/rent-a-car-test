import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    const { model, active, _ids } = await req.json();
    console.log(model, active, _ids);

    connectDb();
    const Model = await import(`@/app/models/${model}`).then(
      (mod) => mod.default
    );
    await Model.updateMany(
      { _id: { $in: _ids } },
      { $set: { active: active } }
    );

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
