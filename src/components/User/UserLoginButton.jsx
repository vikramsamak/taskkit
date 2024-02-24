"use client";

import { useAuthContext } from "@/Contexts/AuthContexts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

function UserLoginButton() {
  const { googleLogIn } = useAuthContext();

  const router = useRouter();

  const handleLogIn = async () => {
    try {
      await googleLogIn();
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
    }
  };

  return (
    <Button
      className="inline-flex h-full items-center gap-4"
      onClick={handleLogIn}
    >
      <FaGoogle size={15} />
      <span className="text-lg font-mono">Login</span>
    </Button>
  );
}

export default UserLoginButton;
