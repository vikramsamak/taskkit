import { AiFillCalculator } from "react-icons/ai";
import { RiTodoFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

export const OPERATORS = ["+", "-", "*", "/"];

export const CALCULATOR = "CALCULATOR";

export const TODOS = "TODOS";

export const HOME = "HOME";

export const PROFILE = "PROFILE";

export const ROUTES = [
  {
    icon: <AiFillCalculator size={25} />,
    hoverText: CALCULATOR,
    href: "/calculator",
  },
  { icon: <FaUser size={25} />, hoverText: PROFILE, href: "/profile" },
  { icon: <RiTodoFill size={25} />, hoverText: TODOS, href: "/todos" },
];
