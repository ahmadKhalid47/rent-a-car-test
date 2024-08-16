import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const saltRounds = 10; // Number of salt rounds to use

  const hashPassword = async (password: any) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Failed to hash password");
    }
  };

  try {
    let { password, token } = await req.json();
    connectDb();
    let hashedPassword = await hashPassword(password);
    let loginData = await RegistrationModel.updateOne(
      { fptoken: token },
      { $set: { password: hashedPassword } }
    );
    
    if (loginData.acknowledged) {
      await RegistrationModel.updateOne(
        { fptoken: token },
        { $set: { fptoken: "" } }
      );
      return NextResponse.json({
        success: "Your password has been updated successfully.",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
