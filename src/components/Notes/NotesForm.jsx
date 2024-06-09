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
import Loader from "../SharedComponents/Loader";

function NotesForm({
  editNote,
  isCreatePending,
  createMutate,
  isUpdatePending,
  updateMutate,
}) {
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
      title: editNote ? editNote.title : "",
      description: editNote ? editNote.description : "",
    },
  });

  function onSubmit(values) {
    if (editNote) {
      updateMutate({
        ...editNote,
        title: values.title,
        description: values.description,
      });
    } else {
      createMutate(values);
    }
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
                <Textarea placeholder="Description for note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isCreatePending || isUpdatePending ? (
            <Loader />
          ) : editNote ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default NotesForm;
