"use client";
import React, { useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtons from "./CalculatorButtons";
import { CALCULATOR } from "@/helpers/Constants";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import AppWindow from "../SharedComponents/AppWindow";
import AppMainSection from "../SharedComponents/AppMainSection";

function CalculatorWindow() {
  const [displayContent, setDisplayContent] = useState("");
  return (
    <AppWindow>
      <AppWindowHeader windowName={CALCULATOR} />
      <AppMainSection>
        <CalculatorDisplay displayContent={displayContent} />
        <CalculatorButtons
          setDisplayContent={setDisplayContent}
          displayContent={displayContent}
        />
      </AppMainSection>
    </AppWindow>
  );
}

export default CalculatorWindow;
