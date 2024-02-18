import { Button } from "@/components/ui/button";
import React from "react";

function CalculatorHeader() {
  return (
    <div className="flex w-full justify-start border-b border-input h-16 px-2 py-2">
      <div className="flex items-center">
        <p className="font-mono">CALCULATOR</p>
      </div>
    </div>
  );
}

export default CalculatorHeader;
