import CalculatorWindow from "@/components/SharedComponents/Calculator/CalculatorWindow";
import PageView from "@/components/SharedComponents/PageView";
import React from "react";

function Calculatorpage() {
  return <PageView window={<CalculatorWindow />}></PageView>;
}

export default Calculatorpage;
