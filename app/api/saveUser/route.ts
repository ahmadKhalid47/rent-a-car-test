import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const saltRounds = 10;

  const hashPassword = async (password: any) => {
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
    console.log(data);
    connectDb();

    let profilePicString =
      profilePic && Array.isArray(profilePic) ? profilePic[0] : null;
    let hashedPassword = await hashPassword(password);

    await new registrationModel({
      profilePic: profilePicString,
      username: username,
      firstName: name,
      lastName: name,
      name: name,
      phone: phone,
      email: email,
      company: company,
      country: country,
      state: state,
      city: city,
      plan: plan,
      password: hashedPassword,
      admin: false,
      address: "address",
    }).save();

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
