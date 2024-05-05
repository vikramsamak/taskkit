"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { getBaseURl } from "@/helpers/helperFunctions";
import { NOTES, ROUTES } from "@/helpers/Constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/Contexts/AuthContexts";

function NotesForm() {
  const queryClient = useQueryClient();
  const authUSer = useAuthContext();
  const notesForm = z.object({
    title: z
      .string()
      .min(4, { message: "Title must be at least 4 characters long" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" }),
  });

  const form = useForm({
    resolver: zodResolver(notesForm),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createNote = async (notesData) => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.notes.createNote}`;
    try {
      const res = await axios.post(URL, notesData);
      if (res.data) {
        return res.data;
      }
      if (res.error) {
        return Promise.reject(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notesQuery = [authUSer._id, NOTES];

  const { data, isPending, mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
  });

  if (data) {
    console.log(data);
  }

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title for note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Title for note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default NotesForm;
