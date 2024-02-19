"use client";

import { TODOS } from "@/helpers/Constants";

function TodoWindow() {
  return (
    <section className="flex flex-col gap-2 rounded-sm justify-center items-center border border-input shadow-xl h-[500px] w-[600px]">
      <div>{TODOS}</div>
    </section>
  );
}

export default TodoWindow;
