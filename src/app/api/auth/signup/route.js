import { dbConnect } from "@/db/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { TOKEN } from "@/helpers/Constants";
import { getAvatar, getJWTToken } from "@/helpers/helperFunctions";

export async function POST(req) {
  try {
    await dbConnect();
    const { fullName, username, password, confirm_password } = await req.json();

    if (password !== confirm_password) {
      return NextResponse.json({ error: "Password dont match" });
    }

    const user = await User.findOne({ username: username });

    if (user) {
      return NextResponse.json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasswrod = await bcrypt.hash(password, salt);

    const avatarUrl = await getAvatar(username);

    const newUser = new User({
      fullName,
      username,
      password: hashedPasswrod,
      avatarUrl,
    });

    if (newUser) {
      await newUser.save();

      const token = getJWTToken(newUser._id);

      const response = NextResponse.json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        avatarUrl: newUser.avatarUrl,
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
