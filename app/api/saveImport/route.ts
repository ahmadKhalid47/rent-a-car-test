import connectDb from "@/app/models/connectDb";
import CityModel from "@/app/models/City";
import MakeModel from "@/app/models/Make";
import OwnershipModel from "@/app/models/Ownership";
import InsuranceModel from "@/app/models/Insurance";
import CategoryModel from "@/app/models/Category";
import ModelModel from "@/app/models/Model";
import CountryModel from "@/app/models/Country";
import FeatureModel from "@/app/models/Feature";
import ColorModel from "@/app/models/Color";
import TypeModel from "@/app/models/Type";
import { NextResponse } from "next/server";
import RegistrationModel from "@/app/models/registration";

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
  ownership: OwnershipModel,
  insurance: InsuranceModel,
  category: CategoryModel,
  model: ModelModel,
  city: CityModel,
  country: CountryModel,
  feature: FeatureModel,
  color: ColorModel,
  type: TypeModel,
};

// Filter out unwanted fields and trim string values in data
function filterData(data: DataItem) {
  const { createdAt, createdBy, updatedAt, _id, __v, ...filteredData } = data;

  // Trim string properties in filteredData
  for (const key in filteredData) {
    if (typeof filteredData[key] === "string") {
      filteredData[key] = filteredData[key].trim();
    }
  }

  return filteredData;
}

// Function to save data if conditions are met
async function saveData(
  Model: any,
  data: DataItem,
  createdBy: string,
  isAdmin: boolean
) {
  const filteredData = filterData(data); // Filter out unwanted fields and trim data

  // Check if the data already exists for the same createdBy only if user is admin
  if (isAdmin) {
    const existingData = await Model.findOne({ ...filteredData, createdBy });

    if (!existingData) {
      const newData = new Model({ ...filteredData, createdBy });
      await newData.save();
    }
  } else {
    // If not admin, save only if it doesn't already exist
    const existingData = await Model.findOne({ ...filteredData });

    if (!existingData) {
      const newData = new Model({ ...filteredData, createdBy });
      await newData.save();
    }
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

    const Model = modelsMap[modelName?.toLowerCase()];

    if (!Model) {
      return NextResponse.json(
        { error: "Invalid model name" },
        { status: 400 }
      );
    }

    // Check if createdBy user is an admin
    const registration = await RegistrationModel.findById(createdBy);
    const isAdmin = registration ? registration.admin : false; // Assuming `admin` is a boolean field

    const savePromises = data.map(async (item) => {
      await saveData(Model, item, createdBy, isAdmin);
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
