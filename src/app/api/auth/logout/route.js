import { TOKEN } from "@/helpers/Constants";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const resnponse = NextResponse.json({ message: "Logged out sucessfully" });
    resnponse.cookies.delete(TOKEN);
    return resnponse;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
