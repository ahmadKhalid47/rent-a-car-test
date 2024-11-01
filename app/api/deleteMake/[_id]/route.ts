import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: any) {
  try {
    const { _id } = params.params;
    await connectDb();

    const { make } = await MakeModel.findOne({ _id: _id });
    
    const data = await MakeModel.deleteOne({ _id: _id });
    await ModelModel.deleteOne({ make: make });

    return NextResponse.json({
      acknowledged: data.acknowledged,
      message: `Make deleted successfully`,
    });
  } catch (err) {
    console.error("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
