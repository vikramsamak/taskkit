"use client";

import PageView from "@/components/SharedComponents/PageView";
import UserProfileCard from "@/components/User/UserProfileCard";
import { useAuthContext } from "@/Contexts/AuthContexts";

function Profilepage() {
  const { user } = useAuthContext();

  return <PageView window={<UserProfileCard user={user} />}></PageView>;
}

export default Profilepage;
