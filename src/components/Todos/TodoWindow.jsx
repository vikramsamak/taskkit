"use client";

import TodosHeader from "./TodosHeader";

function TodoWindow() {
  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      <TodosHeader />
      <div className="flex flex-1 gap-2 px-2 py-2 w-full">
        <div className="flex flex-col gap-2 w-1/5 h-full border border-input">
        

        </div>
        <div className="flex  w-4/5 h-full border border-input"></div>
      </div>
    </section>
  );
}

export default TodoWindow;
