"use client";
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const { data: currentUser, status, update } = useSession();

  const user = currentUser?.user;

  return { user, status, update };
};

export default useCurrentUser;
