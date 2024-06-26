"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function NotesCard({ note, openEditDialog, isDeletePending, deleteMutate }) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{note.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex w-full justify-end gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            openEditDialog(note);
          }}
        >
          <MdEdit />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            deleteMutate(note._id);
          }}
        >
          <MdDelete />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default NotesCard;
