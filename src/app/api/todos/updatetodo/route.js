import { dbConnect } from "@/db/connect";
import { getUserDetailsFromToken } from "@/helpers/helperFunctions";
import Todos from "@/models/todosModels";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const user = await getUserDetailsFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reqBody = await req.json();
  const { _id, title, description, status, dueDate } = reqBody;
  try {
    await dbConnect();

    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: _id, user: user.id },
      {
        title,
        description,
        status,
        dueDate,
      },
      { new: true }
    );
    if (!updatedTodo) {
      return NextResponse.json({ error: "Failed to update todo" });
    }

    return NextResponse.json({ message: "Todo updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
