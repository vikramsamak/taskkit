import { dbConnect } from "@/db/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const dbConnection = await dbConnect();
}
