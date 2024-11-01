import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { _ids } = await req.json();
    await connectDb();

    
    for (const _id of _ids) {
      const Make = await MakeModel.findOne({ _id: _id });
      console.log("Make____", Make,_ids);

      if (Make) {
        await ModelModel.deleteMany({ make: Make.make });
      }
    }
    const data = await MakeModel.deleteMany({ _id: { $in: _ids } });

    return NextResponse.json({
      acknowledged: data.acknowledged,
      message: `Category deleted successfully`,
    });
  } catch (err) {
    console.error("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
