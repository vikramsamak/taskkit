"use client";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

function UserAvatar({ size, photoUrl }) {
  const { data: currentUser, status } = useSession();
  const user = currentUser?.user;
  let fallBackText;

  if (user && user.fullName) {
    const names = user.fullName.split(" ");
    if (names.length === 3) {
      fallBackText = `${names[0][0]}${names[2][0]}`;
    } else if (names.length === 2) {
      fallBackText = `${names[0][0]}${names[1][0]}`;
    }
  }
  return (
    <Avatar
      className={`${
        size ? size : "w-10 h-10"
      } flex items-center justify-center border border-input`}
    >
      <AvatarImage src={photoUrl} />
      <AvatarFallback>
        <span className="font-mono -tracking-wider">{fallBackText}</span>
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
