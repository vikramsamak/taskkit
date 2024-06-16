"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "../ui/button";
import Loader from "../SharedComponents/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { TODOS_DEFAULT_STATUS, TODOS_STATUS } from "@/helpers/Constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function TodoForm({
  editTodo,
  setIsModalOpen,
  createMutate,
  updateMutate,
  isCreatePending,
  isUpdatePending,
}) {
  const [date, setDate] = useState(editTodo ? editTodo.dueDate : null);
  const todosForm = z.object({
    title: z
      .string()
      .min(4, { message: "Title must be at least 4 characters long" })
      .refine((value) => value.trim() !== "", {
        message: "Title is required.",
      }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .refine((value) => value.trim() !== "", {
        message: "Description is required.",
      }),
    status: z.enum(TODOS_STATUS, { message: "Status must be selected." }),
    dueDate: z.string().refine((value) => value.trim() !== "", {
      message: "Date must be selected.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(todosForm),
    defaultValues: {
      title: editTodo ? editTodo.title : "",
      description: editTodo ? editTodo.description : "",
      status: editTodo ? editTodo.status : "",
      dueDate: editTodo ? editTodo.dueDate : "",
    },
  });

  function onSubmit(values) {
    if (editTodo) {
      updateMutate({
        ...editTodo,
        title: values.title,
        description: values.description,
        status: values.status,
        dueDate: values.dueDate,
      });
      setIsModalOpen(false);
    } else {
      createMutate(values);
      setIsModalOpen(false);
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
                <Input placeholder="Title for todo" {...field} />
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
                <Textarea placeholder="Description for todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-2"
                >
                  {TODOS_STATUS.map((status, i) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={i}
                    >
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal">{status}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) => {
                      setDate(addDays(new Date(), parseInt(value)));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        form.setValue("dueDate", date?.toISOString());
                      }}
                      disabled={(date) =>
                        isBefore(startOfDay(date), startOfDay(new Date()))
                      }
                      initialFocus
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isCreatePending || isUpdatePending ? (
            <Loader />
          ) : editTodo ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default TodoForm;
