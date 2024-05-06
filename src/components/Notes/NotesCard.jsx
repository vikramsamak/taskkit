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
import axios from "axios";
import { useAuthContext } from "@/Contexts/AuthContexts";
import { NOTES, ROUTES } from "@/helpers/Constants";
import { getBaseURl } from "@/helpers/helperFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function NotesCard({ note, setIsModalOpen }) {
  const authUSer = useAuthContext();
  const notesQuery = [authUSer._id, NOTES];
  const queryClient = useQueryClient();

  const deleteNote = async (noteId) => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.notes.deleteNote}?noteId=${noteId}`;
    try {
      const res = axios.delete(URL);
      if (res.data) {
        return res.data.message;
      }
      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, mutate, error } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQuery });
      toast.success(data);
    },
    onError: () => {
      toast.error(error);
    },
  });

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
            setIsModalOpen(true);
          }}
        >
          <MdEdit />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            mutate(note._id);
          }}
        >
          <MdDelete />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default NotesCard;
