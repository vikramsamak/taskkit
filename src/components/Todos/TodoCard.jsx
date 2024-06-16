import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";

function TodoCard({ todo, openEditDialog, isDeletePending, deleteMutate }) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{todo.description}</CardDescription>
      </CardContent>
      <CardContent className="flex w-full justify-between">
        <CardDescription>{todo.status}</CardDescription>
        <CardDescription>{new Date(todo?.dueDate)}</CardDescription>
      </CardContent>
      <CardFooter className="flex w-full justify-end gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            openEditDialog(todo);
          }}
        >
          <MdEdit />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            deleteMutate(todo._id);
          }}
        >
          <MdDelete />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TodoCard;
