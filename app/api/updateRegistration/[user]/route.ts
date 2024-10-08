import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let {
      profilePic,
      username,
      firstName,
      lastName,
      phone,
      email,
      address,
    } = await req.json();
    let { user } = await params.params;
    connectDb();
    await RegistrationModel.updateOne(
      { $or: [{ username: user }, { email: user }] },
      {
        $set: {
          profilePic: profilePic,
          username,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          address: address,
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
