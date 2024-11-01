import CategoryModel from "@/app/models/Category";
import connectDb from "@/app/models/connectDb";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { _ids } = await req.json();
    await connectDb();

    
    for (const _id of _ids) {
      const Category = await CategoryModel.findOne({ _id: _id });
      console.log("Category____", Category,_ids);

      if (Category) {
        await MakeModel.deleteMany({ Category: Category.Category });
        await ModelModel.deleteMany({ Category: Category.Category });
      }
    }
    const data = await CategoryModel.deleteMany({ _id: { $in: _ids } });

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
