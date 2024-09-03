import connectDb from "@/app/models/connectDb";
import CustomerModel from "@/app/models/customer";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { active, _ids } = await req.json(); // Expecting `_ids` to be an array of `_id`
    connectDb();
console.log(active, _ids);
    // Update all documents where the `_id` is in the array of `_ids`
    await CustomerModel.updateMany(
      { _id: { $in: _ids } },
      { $set: { active: active } }
    );

    return NextResponse.json({
      success: "Customers updated successfully",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
