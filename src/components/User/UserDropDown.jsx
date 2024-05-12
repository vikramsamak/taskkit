"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Loader from "../SharedComponents/Loader";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

function UserDropDown() {
  const { status, user } = useCurrentUser();

  const logOut = async () => {
    signOut();
  };

  async function handlelogout() {
    await logOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {status === "loading" ? (
          <Loader />
        ) : (
          <UserAvatar photoUrl={user?.avatarUrl} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push("/apps/profile");
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
