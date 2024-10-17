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

// Filter out unwanted fields from the data
function filterData(data: DataItem) {
  const { createdAt, createdBy, updatedAt, _id, __v, ...filteredData } = data;
  return filteredData;
}

// Function to save data if not already existing based on `createdBy`
async function saveData(Model: any, data: DataItem, createdBy: string) {
  const filteredData = filterData(data); // Filter out unwanted fields

  // Check if the data already exists for the same createdBy
  const existingData = await Model.findOne({ ...filteredData, createdBy });

  if (!existingData) {
    const newData = new Model({ ...filteredData, createdBy });
    await newData.save();
    console.log("data saved: ", filteredData);
  } else {
    console.log("data already exists, skipping: ", filteredData);
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

    if (!Model) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }

    const savePromises = data.map(async (item) => {
      await saveData(Model, item, createdBy);
    });

    // Wait for all save operations to complete
    await Promise.all(savePromises);

    return NextResponse.json({ success: "Data processed successfully!" });
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
  const filteredItem = filterData(item); // Filter out unwanted fields
  const query: any = {};
  Object.keys(filteredItem).forEach((key) => {
    query[key] = filteredItem[key];
  });
  return query;
}
