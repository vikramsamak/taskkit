import { PiCalculatorLight } from "react-icons/pi";
import { RiTodoLine } from "react-icons/ri";

export const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

export const OPERATORS = ["+", "-", "*", "/"];

export const CALCULATOR = "CALCULATOR";

export const TODOS = "TODOS";

export const TABS = [
  { icon: <PiCalculatorLight size={25} />, hoverText: CALCULATOR },
  { icon: <RiTodoLine size={25} />, hoverText: TODOS },
];
