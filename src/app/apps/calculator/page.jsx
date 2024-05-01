import CalculatorWindow from "@/components/Calculator/CalculatorWindow";
import PageView from "@/components/SharedComponents/PageView";
import React from "react";

function Calculatorpage() {
  return <PageView window={<CalculatorWindow />}></PageView>;
}

export default Calculatorpage;
