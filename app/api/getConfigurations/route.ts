import connectDb from "@/app/models/connectDb";
import ColorModel from "@/app/models/Color";
import MakeModel from "@/app/models/Make";
import CategoryModel from "@/app/models/Category";
import ModelModel from "@/app/models/Model";
import FeatureModel from "@/app/models/Feature";
import TypeModel from "@/app/models/Type";
import CountryModel from "@/app/models/Country";
import CityModel from "@/app/models/City";
import { NextResponse } from "next/server";
import RegistrationModel from "@/app/models/registration";

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
    const adminCheck = await RegistrationModel.findOne({ admin: true });

    const queryData = async (model:any) => {
      return model
        .find({
          $or: [
            { createdBy, active: true },
            { createdBy: adminCheck._id, active: true },
          ],
        })
        .sort({ _id: -1 })
        .lean();
    };

    // Parallelize the queries
    const [color, make, Category, model, feature, type, country, city] =
      await Promise.all([
        queryData(ColorModel),
        queryData(MakeModel),
        queryData(CategoryModel),
        queryData(ModelModel),
        queryData(FeatureModel),
        queryData(TypeModel),
        queryData(CountryModel),
        queryData(CityModel),
      ]);

    const wholeData = {
      color,
      make,
      Category,
      model,
      feature,
      type,
      country,
      city,
    };

    return NextResponse.json({ wholeData });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
