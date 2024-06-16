import { dbConnect } from "@/db/connect";
import Todos from "@/models/todosModels";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const todoId = searchParams.get("todoId");
  try {
    await dbConnect();
    const deletedTodo = await Todos.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return NextResponse.json({ message: "Failed to delete todo" });
    }
    return NextResponse.json({ message: "Todo deleted sucsessfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
