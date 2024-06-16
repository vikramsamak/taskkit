import { dbConnect } from "@/db/connect";
import { getUserDetailsFromToken } from "@/helpers/helperFunctions";
import Todos from "@/models/todosModels";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await getUserDetailsFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const todos = await Todos.find({ user: user.id });
    if (!todos) {
      return NextResponse.json({ error: "No todos available" });
    }
    return NextResponse.json({ todos: todos });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
