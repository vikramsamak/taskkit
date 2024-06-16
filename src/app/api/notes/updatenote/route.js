import { dbConnect } from "@/db/connect";
import { getUserDetailsFromToken } from "@/helpers/helperFunctions";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const user = await getUserDetailsFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reqBody = await req.json();

  const { _id, title, description } = reqBody;

  try {
    await dbConnect();

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: _id, user: user.id },
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Failed to update note" });
    }

    return NextResponse.json({ message: "Note updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
