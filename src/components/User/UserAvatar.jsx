import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({ size, user }) {
  return (
    <Avatar className={`${size ? size : "w-10 h-10"}`}>
      <AvatarImage src={user?.photoURL} />
    </Avatar>
  );
}

export default UserAvatar;
