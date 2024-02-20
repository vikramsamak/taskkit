"use client";
import React, { useState } from "react";
import CalculatorHeader from "./CalculatorHeader";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtons from "./CalculatorButtons";

function CalculatorWindow() {
  const [displayContent, setDisplayContent] = useState("");
  return (
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
  );
}

export default CalculatorWindow;
