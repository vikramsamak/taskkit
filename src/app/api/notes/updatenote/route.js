import { dbConnect } from "@/db/connect";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const reqBody = await req.json();
  const { _id, title, description } = reqBody;
  try {
    await dbConnect();

    const updatedNote = await Notes.findByIdAndUpdate(_id, {
      title,
      description,
    });
    if (!updatedNote) {
      return NextResponse.json({ error: "Failed to update note" });
    }

    return NextResponse.json({ message: "Note updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
