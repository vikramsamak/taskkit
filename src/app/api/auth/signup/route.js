import { dbConnect } from "@/db/connect";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { TOKEN } from "@/helpers/Constants";
import { getJWTToken } from "@/helpers/helperFunctions";

export async function POST(req) {
  try {
    await dbConnect();
    const { fullName, username, password, confirm_password } = await req.json();

    if (password !== confirm_password) {
      return NextResponse.json({ error: "Password dont match" });
    }

    const user = await UserModel.findOne({ username: username });

    if (user) {
      return NextResponse.json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasswrod = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      fullName,
      username,
      password: hashedPasswrod,
    });

    if (newUser) {
      await newUser.save();

      const token = getJWTToken(newUser._id);

      const response = NextResponse.json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
      });

      response.cookies.set({
        name: TOKEN,
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
