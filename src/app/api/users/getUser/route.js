import { dbConnect } from "@/db/connect";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    await dbConnect();

    const userData = await User.findById(id);

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "User found" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
