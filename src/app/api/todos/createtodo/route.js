import { dbConnect } from "@/db/connect";
import Todos from "@/models/todosModels";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  const { title, description, status, dueDate } = reqBody;

  try {
    await dbConnect();
    const savedTodo = await Todos.create({
      title,
      description,
      status,
      dueDate,
    });

    if (!savedTodo) {
      return NextResponse.json({ error: "Failed to save Todo" });
    }

    return NextResponse.json({ message: "Todo sucessfully saved" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
