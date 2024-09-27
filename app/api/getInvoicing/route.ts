import connectDb from "@/app/models/connectDb";
import updateInvoicingModel from "@/app/models/updateInvoicing";
import { NextResponse } from "next/server";

// Disable cache for this API route
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  try {
        const { createdBy } = await req.json();
        if (!createdBy) {
          return NextResponse.json(
            { error: "createdBy is required" },
            { status: 400 }
          );
        }

    await connectDb();
    const data = await updateInvoicingModel.find({ createdBy });
    const response = NextResponse.json({ data });
    return response;
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json(
      {
        error: "Can't process your request at the moment",
      },
      { status: 500 }
    );
  }
}
