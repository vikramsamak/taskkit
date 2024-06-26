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
import { useRouter } from "next/navigation";
import Loader from "../SharedComponents/Loader";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";

function UserLoginForm() {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 character long" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = async (data) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (res.error) {
        toast.error(res.error);
      }
      if (res.ok) {
        router.push("/apps/profile");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values) {
    await login(values);
  }

  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      <div className="flex w-full justify-center border-b border-input h-16 px-2 py-2">
        <div className="flex items-center">
          <p className="font-mono tracking-widest uppercase">Login</p>
        </div>
      </div>
      <div className="flex-1 flex justify-center gap-2 h-full items-center px-2 py-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono tracking-wider uppercase">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      className="placeholder:font-mono tracking-wider"
                    />
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
                  <FormLabel className="font-mono tracking-wider">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                      className="placeholder:font-mono tracking-wider"
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
              {isLoading ? (
                <Loader />
              ) : (
                <span className="font-mono tracking-wider uppercase">
                  Login
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex w-full justify-center">
        <p className="text-center font-mono tracking-wider uppercase">
          Don&apos;t have a account ?
          <Link
            href="/signup"
            className="hover:underline ml-2 font-mono tracking-wider uppercase"
          >
            SignUp
          </Link>
        </p>
      </div>
    </section>
  );
}

export default UserLoginForm;
