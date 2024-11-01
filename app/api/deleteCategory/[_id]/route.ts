import CategoryModel from "@/app/models/Category";
import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: any) {
  try {
    const { _id } = params.params;
    await connectDb();

    const { Category } = await CategoryModel.findOne({ _id: _id });
    const data = await CategoryModel.deleteOne({ _id: _id });
    await MakeModel.deleteOne({ Category: Category });
    await ModelModel.deleteOne({ Category: Category });

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
