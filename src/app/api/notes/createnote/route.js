import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  const { title, description } = reqBody;
  console.log(title, description);
  return NextResponse.json({ msg: "ok" });
}
