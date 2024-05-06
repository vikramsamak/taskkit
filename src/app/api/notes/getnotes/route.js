import { dbConnect } from "@/db/connect";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const notes = await Notes.find();
    if (!notes) {
      return NextResponse.json({ error: "No notes available" });
    }
    return NextResponse.json({ notes: notes });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
