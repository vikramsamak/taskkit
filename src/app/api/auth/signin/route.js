import { dbConnect } from "@/db/connect";
import Users from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getJWTToken } from "@/helpers/helperFunctions";
import { TOKEN } from "@/helpers/Constants";

export async function POST(req) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    const user = await Users.findOne({ username: username });

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!user || !isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid Credientials" });
    }

    const token = getJWTToken(user._id);

    const response = NextResponse.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      avatarUrl: user.avatarUrl,
    });

    response.cookies.set({
      name: TOKEN,
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
