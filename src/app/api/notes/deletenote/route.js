import { dbConnect } from "@/db/connect";
import { getUserDetailsFromToken } from "@/helpers/helperFunctions";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const user = await getUserDetailsFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const searchParams = req.nextUrl.searchParams;
  const noteId = searchParams.get("noteId");
  try {
    await dbConnect();
    
    const deletedNote = await Notes.findOneAndDelete({
      _id: noteId,
      user: user.id,
    });

    if (!deletedNote) {
      return NextResponse.json({ message: "Failed to delete note" });
    }

    return NextResponse.json({ message: "Note deleted sucsessfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
