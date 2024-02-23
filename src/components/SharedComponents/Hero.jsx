"use client";

import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { useAuthContext } from "@/Contexts/AuthContexts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Hero() {
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
    <section className="flex flex-col py-4 px-4 gap-4">
      <div className="text-center px-2 py-2">
        <h1 className="text-8xl font-mono tracking-widest">TASKKIT</h1>
      </div>
      <div className="text-center px-2 py-2">
        <p className="text-lg font-mono tracking-wider">
          All your tools in one place for maximum efficiency
        </p>
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          className="inline-flex h-full items-center gap-4"
          onClick={handleLogIn}
        >
          <FaGoogle size={15} />
          <span className="text-lg font-mono">Login</span>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
