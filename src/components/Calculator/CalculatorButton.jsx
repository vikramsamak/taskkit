import React from "react";
import { Button } from "@/components/ui/button";

function CalculatorButton({ text, onPress }) {
  return (
    <Button
      onClick={() => {
        onPress(text);
      }}
      className="flex h-full w-full justify-center items-center"
      variant="outline"
    >
      <span className="text-2xl font-mono">{text}</span>
    </Button>
  );
}

export default CalculatorButton;
