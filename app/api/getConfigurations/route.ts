import connectDb from "@/app/models/connectDb";
import ColorModel from "@/app/models/Color";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const color = await ColorModel.find().sort({ _id: -1 });
    const make = await ColorModel.find().sort({ _id: -1 });
    const model = await ColorModel.find().sort({ _id: -1 });
    const feature = await ColorModel.find().sort({ _id: -1 });
    const type = await ColorModel.find().sort({ _id: -1 });
    let wholeData = {
      color,
      make,
      model,
      feature,
      type,
    };
    console.log(wholeData);
    return NextResponse.json({
      wholeData,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
