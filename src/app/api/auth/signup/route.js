import { dbConnect } from "@/db/connect";
import Users from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { TOKEN } from "@/helpers/Constants";
import { getAvatar } from "@/helpers/helperFunctions";

export async function POST(req) {
  try {
    await dbConnect();
    const { fullName, username, password, confirm_password } = await req.json();

    if (password !== confirm_password) {
      return NextResponse.json({ error: "Password dont match" });
    }

    const user = await Users.findOne({ username: username });

    if (user) {
      return NextResponse.json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasswrod = await bcrypt.hash(password, salt);

    const avatarUrl = await getAvatar(username);

    const savedUser = await Users.create({
      fullName,
      username,
      password: hashedPasswrod,
      avatarUrl,
    });

    if (savedUser) {
      return NextResponse.json({ message: "User Registered" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
