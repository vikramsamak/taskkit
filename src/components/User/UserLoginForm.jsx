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
import { DEV_ENV_URL, ROUTES } from "@/helpers/Constants";
import { useRouter } from "next/navigation";
import Loader from "../SharedComponents/Loader";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useAuthContext } from "@/Contexts/AuthContexts";

function UserLoginForm() {
  const { setUser } = useAuthContext();
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
    var URL = undefined;
    if (process.env.NODE_ENV == "development") {
      URL = `${DEV_ENV_URL}${ROUTES.api.auth.signin}`;
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

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.warning(error);
    },
  });

  function onSubmit(values) {
    mutateAsync(values);
  }

  if (data) {
    setUser(data);
    router.push(ROUTES.page.protected.profile);
  }

  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      <div className="flex w-full justify-center border-b border-input h-16 px-2 py-2">
        <div className="flex items-center">
          <p className="font-mono tracking-widest">Login</p>
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
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
                    <Input type="password" placeholder="password" {...field} />
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
                <span className="font-mono tracking-wider">Login</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex w-full justify-center">
        <p className="text-center font-mono tracking-wider">
          Don&apos;t have a account ?
          <Link href="/signup" className="hover:underline ml-2">
            SignUp
          </Link>
        </p>
      </div>
    </section>
  );
}

export default UserLoginForm;
