import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const saltRounds = 10;

  const hashPassword = async (password: string) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Failed to hash password");
    }
  };

  try {
    let data = await req.json();
    let {
      profilePic,
      username,
      name,
      phone,
      email,
      company,
      country,
      state,
      city,
      plan,
      password,
    } = data;

    connectDb();

    // Check if either the username or email already exists in a single query
    const existingUser = await registrationModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      // Specify which field is already taken
      if (existingUser.username === username) {
        return NextResponse.json({
          error: `Username "${username}" already exists`,
        });
      }
      if (existingUser.email === email) {
        return NextResponse.json({
          error: `Email "${email}" already exists`,
        });
      }
    }

    let profilePicString =
      profilePic && Array.isArray(profilePic) ? profilePic[0] : "noProfile";
    let hashedPassword = await hashPassword(password);

    let savedData = await new registrationModel({
      profilePic: profilePicString,
      username,
      firstName: name,
      lastName: name,
      name,
      phone,
      email,
      company,
      country,
      state,
      city,
      plan,
      password: hashedPassword,
      admin: false,
      address: "address",
      expiryDate: "address",
    }).save();
    console.log(savedData);

    return NextResponse.json({
      success: "User Created",
    });
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
