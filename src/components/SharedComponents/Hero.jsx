import Link from "next/link";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="flex flex-col w-full items-center gap-4">
      <div className="flex flex-col py-2 px-2 gap-4 w-full">
        <div className="text-center px-2 py-2">
          <h1 className="text-4xl font-mono tracking-widest">TASKKIT</h1>
        </div>
        <div className="text-center px-2 py-2">
          <p className="text-lg font-mono tracking-wider uppercase">
            All your tools in one place for maximum efficiency
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button varriant="outline">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
