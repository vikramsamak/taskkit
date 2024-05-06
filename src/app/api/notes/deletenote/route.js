import { NextResponse } from "next/server";

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('noteId')
  console.log(query);
  return NextResponse.json({ message: "Note deleted sucsessfully" });
}
