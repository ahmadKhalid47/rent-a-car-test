import CityModel from "@/app/models/City";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import CountryModel from "@/app/models/Country";
import FeatureModel from "@/app/models/Feature";
import ColorModel from "@/app/models/Color";
import TypeModel from "@/app/models/Type";
import connectDb from "@/app/models/connectDb";
import { NextResponse } from "next/server";

interface DataItem {
  make?: string;
  model?: string;
  city?: string;
  country?: string;
  Feature?: string;
  Icon?: string;
  Color?: string;
  ColorName?: string;
  Type?: string;
  exterior?: string;
  interior?: string;
}

let isConnected = false;

async function ensureDbConnection() {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
}

// Updated saveIfNotExists function to check for existing createdBy
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

export async function POST(req: Request) {
  try {
    await ensureDbConnection();

    const { data, createdBy }: { data: DataItem[]; createdBy: string } =
      await req.json();

    const makes = new Set<string>();
    const models = new Set<string>();
    const cities = new Set<string>();
    const countries = new Set<string>();
    const features = new Set<string>();
    const colors = new Set<string>();
    const types = new Set<string>();

    data.forEach((item: DataItem) => {
      if (item.make) makes.add(item.make);
      if (item.model) {
        models.add(JSON.stringify({ make: item.make, model: item.model }));
      }
      if (item.city) cities.add(item.city);
      if (item.country) countries.add(item.country);
      if (item.Feature && item.Icon) {
        features.add(
          JSON.stringify({ Feature: item.Feature, Icon: item.Icon })
        );
      }
      if (item.Color && item.ColorName) {
        colors.add(
          JSON.stringify({ Color: item.Color, ColorName: item.ColorName })
        );
      }
      if (item.Type && item.exterior && item.interior) {
        types.add(
          JSON.stringify({
            Type: item.Type,
            exterior: item.exterior,
            interior: item.interior,
          })
        );
      }
    });

    // Save cities
    const cityPromises = Array.from(cities).map(async (city) => {
      const correspondingCountry = data.find(
        (item: DataItem) => item.city === city
      )?.country;
      if (correspondingCountry) {
        await saveIfNotExists(
          CityModel,
          { city, country: correspondingCountry },
          { city, country: correspondingCountry, createdBy },
          createdBy
        );
      }
    });

    // Save makes
    const makePromises = Array.from(makes).map(async (make) => {
      await saveIfNotExists(
        MakeModel,
        { make },
        { make, createdBy },
        createdBy
      );
    });

    // Save models
    const modelPromises = Array.from(models).map(async (model) => {
      const modelData = JSON.parse(model);
      modelData.createdBy = createdBy;
      await saveIfNotExists(
        ModelModel,
        { make: modelData.make, model: modelData.model },
        modelData,
        createdBy
      );
    });

    // Save countries
    const countryPromises = Array.from(countries).map(async (country) => {
      await saveIfNotExists(
        CountryModel,
        { country },
        { country, createdBy },
        createdBy
      );
    });

    // Save features
    const featurePromises = Array.from(features).map(async (feature) => {
      const featureData = JSON.parse(feature);
      featureData.createdBy = createdBy;
      await saveIfNotExists(
        FeatureModel,
        { Feature: featureData.Feature },
        featureData,
        createdBy
      );
    });

    // Save colors
    const colorPromises = Array.from(colors).map(async (color) => {
      const colorData = JSON.parse(color);
      colorData.createdBy = createdBy;
      await saveIfNotExists(
        ColorModel,
        { Color: colorData.Color },
        colorData,
        createdBy
      );
    });

    // Save types
    const typePromises = Array.from(types).map(async (type) => {
      const typeData = JSON.parse(type);
      typeData.createdBy = createdBy;
      await saveIfNotExists(
        TypeModel,
        {
          Type: typeData.Type,
          exterior: typeData.exterior,
          interior: typeData.interior,
        },
        typeData,
        createdBy
      );
    });

    // Wait for all promises to resolve
    await Promise.all([
      ...cityPromises,
      ...makePromises,
      ...modelPromises,
      ...countryPromises,
      ...featurePromises,
      ...colorPromises,
      ...typePromises,
    ]);

    return NextResponse.json({
      success: "Data saved successfully!",
    });
  } catch (err) {
    console.error("Error processing request: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
