import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({ size, photoUrl }) {
  return (
    <Avatar className={`${size ? size : "w-10 h-10"}`}>
      <AvatarImage src={photoUrl} />
    </Avatar>
  );
}

export default UserAvatar;
