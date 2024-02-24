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

function UserDropDown() {
  const { user, logOut } = useAuthContext();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar photoUrl={user?.photoURL} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropDown;
