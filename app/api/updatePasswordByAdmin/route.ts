import connectDb from "@/app/models/connectDb";
import registrationModel from "@/app/models/registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  async function verifyPassword(inputPassword: any, hashedPassword: any) {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  }
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
    const { oldPassword, newPassword, _id } = await req.json();
    await connectDb();
    const data = await registrationModel.findOne({ admin: true });
    let dataPassword: any = data.password;

    if (!(await verifyPassword(oldPassword, dataPassword))) {
      return NextResponse.json({
        error: "Admin password is incorrect.",
      });
    } else {
      let hashedPassword = await hashPassword(newPassword);

      await registrationModel.updateOne(
        { _id },
        { $set: { password: hashedPassword } }
      );

      return NextResponse.json({
        success: "User Password Updated",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
