import connectDb from "@/app/models/connectDb";
import CityModel from "@/app/models/City";
import MakeModel from "@/app/models/Make";
import CategoryModel from "@/app/models/Category";
import ModelModel from "@/app/models/Model";
import CountryModel from "@/app/models/Country";
import FeatureModel from "@/app/models/Feature";
import ColorModel from "@/app/models/Color";
import TypeModel from "@/app/models/Type";
import { NextResponse } from "next/server";

interface DataItem {
  [key: string]: any; // Generic structure to handle all types of data
}

let isConnected = false;

// Ensure database connection is established
async function ensureDbConnection() {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
}

// Utility to dynamically fetch the correct Mongoose model
const modelsMap: { [key: string]: any } = {
  make: MakeModel,
  category: CategoryModel,
  model: ModelModel,
  city: CityModel,
  country: CountryModel,
  feature: FeatureModel,
  color: ColorModel,
  type: TypeModel,
};

// Function to save data if not already existing based on `createdBy`
async function saveIfNotExists(
  Model: any,
  query: any,
  data: any,
  createdBy: string
) {
  const existing = await Model.findOne({ ...query, createdBy });
  if (!existing) {
    const newData = new Model(data);
    await newData.save();
  }
}

// POST endpoint to handle dynamic model-based storage
export async function POST(req: Request) {
  try {
    await ensureDbConnection();

    const {
      modelName,
      data,
      createdBy,
    }: { modelName: string; data: DataItem[]; createdBy: string } =
      await req.json();

    const Model = modelsMap[modelName.toLowerCase()];

    console.log(modelsMap);

    if (!Model) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }

    const savePromises = data.map(async (item) => {
      const query = buildQuery(item); // Create a dynamic query for the item
      await saveIfNotExists(Model, query, { ...item, createdBy }, createdBy);
    });

    // Wait for all save operations to complete
    await Promise.all(savePromises);

    return NextResponse.json({ success: "Data saved successfully!" });
  } catch (err) {
    console.error("Error processing request: ", err);
    return NextResponse.json(
      { error: "Can't process your request at the moment" },
      { status: 500 }
    );
  }
}

// Helper function to build query dynamically based on data
function buildQuery(item: DataItem) {
  const query: any = {};
  Object.keys(item).forEach((key) => {
    query[key] = item[key];
  });
  return query;
}
