import { dbConnect } from "@/db/connect";
import Todos from "@/models/todosModels";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const reqBody = await req.json();
  const { _id, title, description, status, dueDate } = reqBody;
  try {
    await dbConnect();

    const updatedTodo = await Todos.findByIdAndUpdate(_id, {
      title,
      description,
      status,
      dueDate,
    });
    if (!updatedTodo) {
      return NextResponse.json({ error: "Failed to update todo" });
    }

    return NextResponse.json({ message: "Todo updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
