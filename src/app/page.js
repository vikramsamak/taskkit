"use client";

import { useTabContext } from "@/Contexts/Tabcontext";
import CalculatorButtons from "@/components/SharedComponents/Calculator/CalculatorButtons";
import CalculatorDisplay from "@/components/SharedComponents/Calculator/CalculatorDisplay";
import CalculatorHeader from "@/components/SharedComponents/Calculator/CalculatorHeader";
import { CALCULATOR, TODOS } from "@/helpers/Constants";
import { useState } from "react";

export default function Home() {
  const [displayContent, setDisplayContent] = useState("");

  const { selectedTab } = useTabContext();

  return (
    <main className="flex-1 flex justify-center items-center py-6 px-6">
      {selectedTab === CALCULATOR ? (
        <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
          <CalculatorHeader />
          <div className="flex-1 flex flex-col gap-2 px-2 py-2">
            <CalculatorDisplay displayContent={displayContent} />
            <CalculatorButtons
              setDisplayContent={setDisplayContent}
              displayContent={displayContent}
            />
          </div>
        </section>
      ) : selectedTab === TODOS ? (
        <section className="flex flex-col gap-2 rounded-sm justify-center items-center border border-input shadow-xl h-[500px] w-[600px]">
          <div>{TODOS}</div>
        </section>
      ) : null}
    </main>
  );
}
