import connectDb from "@/app/models/connectDb";
import CategoryModel from "@/app/models/Category";
import { NextResponse } from "next/server";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";

export async function POST(req: Request, params: any) {
  try {
    let { Category } = await req.json();
    let { _id } = await params.params;
    connectDb();
    const  CategoryData  = await CategoryModel.findOne({ _id: _id });
    await CategoryModel.updateOne({ _id: _id }, { $set: { Category: Category } });
    await MakeModel.updateMany(
      { Category: CategoryData.Category },
      { $set: { Category: Category } }
    );
    await ModelModel.updateMany(
      { Category: CategoryData.Category },
      { $set: { Category: Category } }
    );
    return NextResponse.json({
      success: "User Created",
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
