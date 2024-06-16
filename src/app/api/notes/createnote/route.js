import { dbConnect } from "@/db/connect";
import { getUserDetailsFromToken } from "@/helpers/helperFunctions";
import Notes from "@/models/notesModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUserDetailsFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reqBody = await req.json();

  const { title, description } = reqBody;

  try {
    await dbConnect();
    const savedNote = await Notes.create({
      title: title,
      description: description,
      user: user.id,
    });

    if (!savedNote) {
      return NextResponse.json({ error: "Failed to save note" });
    }

    return NextResponse.json({ message: "Note sucessfully saved" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
