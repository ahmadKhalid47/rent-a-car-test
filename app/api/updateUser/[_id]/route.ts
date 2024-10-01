import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request, params: any) {
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
    console.log(data);
    
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
    let hashedPassword = await hashPassword(password);
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
          password: hashedPassword,
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
