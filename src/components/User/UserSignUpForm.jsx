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
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DEV_ENV_URL, ROUTES } from "@/helpers/Constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "../SharedComponents/Loader";

function UserSignUpForm() {
  const router = useRouter();

  const formSchema = z
    .object({
      fullName: z.string().min(1, { message: "Full name is required." }),
      username: z
        .string()
        .min(6, { message: "Username must be at least 6 characters." }),
      password: z
        .string()
        .min(8, { message: "Password must be 8 characters long." }),
      confirm_password: z
        .string()
        .min(8, { message: "Password must be 8 characters long." }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match.",
      path: ["confirm_password"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const signup = async (data) => {
    var URL = undefined;
    if (process.env.NODE_ENV == "development") {
      URL = `${DEV_ENV_URL}${ROUTES.api.auth.signup}`;
    }
    try {
      const res = await axios.post(URL, data);

      if (res.data.error) {
        return Promise.reject(res.data.error);
      }

      return res.data;
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      toast.warning(error);
    },
  });

  function onSubmit(values) {
    mutateAsync(values);
  }

  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      <div className="flex w-full justify-center border-b border-input h-16 px-2 py-2">
        <div className="flex items-center">
          <p className="font-mono tracking-widest">Sign Up</p>
        </div>
      </div>
      <div className="flex-1 flex justify-center gap-2 px-2 py-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="inline-flex justify-center items-center"
            >
              {isPending ? (
                <Loader />
              ) : (
                <span className="font-mono tracking-wider">Sign Up</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex w-full justify-center">
        <p className="text-center font-mono tracking-wider">
          Already have a account ?
          <Link href="/" className="hover:underline ml-2">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default UserSignUpForm;
