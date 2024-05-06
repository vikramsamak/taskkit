import { dbConnect } from "@/db/connect";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const noteId = searchParams.get("noteId");
  try {
    await dbConnect();
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return NextResponse.json({ message: "Failed to delete note" });
    }
    return NextResponse.json({ message: "Note deleted sucsessfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
