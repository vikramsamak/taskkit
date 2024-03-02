"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { useAuthContext } from "@/Contexts/AuthContexts";
import { useMutation } from "@tanstack/react-query";
import { DEV_ENV_URL, ROUTES } from "@/helpers/Constants";
import axios from "axios";
import Loader from "../SharedComponents/Loader";

function UserDropDown() {
  const { user, setUser } = useAuthContext();
  const router = useRouter();

  const logOut = async () => {
    var URL = undefined;
    if (process.env.NODE_ENV == "development") {
      URL = `${DEV_ENV_URL}${ROUTES.api.auth.logout}`;
    }
    try {
      const res = await axios.post(URL);

      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
    }
  };

  const { ispending, mutateAsync } = useMutation({
    mutationFn: logOut,
    onError: (error) => {
      toast.warning(error);
    },
    onSuccess: () => {
      localStorage.removeItem("CURRENTUSER");
      setUser(null);
      router.push(ROUTES.page.index);
    },
  });

  const handlelogout = () => {
    mutateAsync();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {ispending ? <Loader /> : <UserAvatar photoUrl={user?.avatarUrl} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlelogout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropDown;
