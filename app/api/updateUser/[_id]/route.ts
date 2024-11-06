import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
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
    let { _id } = await params.params;
    connectDb();
    let profilePicString =
      profilePic && Array.isArray(profilePic) ? profilePic[0] : null;
    await registrationModel.updateOne(
      { _id: _id },
      {
        $set: {
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
          admin: false,
          address: "address",
        },
      }
    );
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
