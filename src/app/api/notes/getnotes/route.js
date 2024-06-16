import { dbConnect } from "@/db/connect";
import { getUserDetailsFromToken } from "@/helpers/helperFunctions";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await getUserDetailsFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const notes = await Notes.find({ user: user.id });
    if (!notes) {
      return NextResponse.json({ error: "No notes available" });
    }
    return NextResponse.json({ notes: notes });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
