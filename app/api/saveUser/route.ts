import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    let profilePicString = profilePic ? profilePic[0] : null;
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
      password: password,
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
