import { dbConnect } from "@/db/connect";
import Todos from "@/models/todosModels";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const todos = await Todos.find();
    if (!todos) {
      return NextResponse.json({ error: "No todos available" });
    }
    return NextResponse.json({ todos: todos });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
