import { dbConnect } from "@/db/connect";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  const { title, description } = reqBody;

  try {
    await dbConnect();
    const savedNote = await Notes.create({
      title: title,
      description: description,
    });

    if (!savedNote) {
      return NextResponse.json({ error: "Failed to save note" });
    }

    return NextResponse.json({ message: "Note sucessfully saved" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
