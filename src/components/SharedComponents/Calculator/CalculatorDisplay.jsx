"use client";

import { Input } from "@/components/ui/input";
import React from "react";

function CalculatorDisplay({ displayContent }) {
  return (
    <Input
      className="h-24 text-end text-6xl font-mono border"
      value={displayContent}
      readOnly
    ></Input>
  );
}

export default CalculatorDisplay;
