import connectDb from "@/app/models/connectDb";
import CategoryModel from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { Category } = await req.json();
    let { _id } = await params.params;
    connectDb();
    await CategoryModel.updateOne({ _id: _id }, { $set: { Category: Category } });
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
