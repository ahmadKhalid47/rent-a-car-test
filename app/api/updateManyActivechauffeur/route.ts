import connectDb from "@/app/models/connectDb";
import chauffeurModel from "@/app/models/chauffeur";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { active, _ids } = await req.json(); // Expecting `_ids` to be an array of `_id`
    connectDb();
console.log(active, _ids);
    // Update all documents where the `_id` is in the array of `_ids`
    await chauffeurModel.updateMany(
      { _id: { $in: _ids } },
      { $set: { active: active } }
    );

    return NextResponse.json({
      success: "chauffeurs updated successfully",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
