import { AiFillCalculator } from "react-icons/ai";
import { RiTodoFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";

export const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

export const OPERATORS = ["+", "-", "*", "/"];

export const CALCULATOR = "CALCULATOR";

export const TODOS = "TODOS";

export const HOME = "HOME";

export const PROFILE = "PROFILE";

export const STOPWATCH = "STOPWATCH";

export const TOKEN = "token";

export const ICONS = [
  {
    icon: <AiFillCalculator size={25} />,
    hoverText: CALCULATOR,
    href: "/apps/calculator",
  },
  { icon: <FaUser size={25} />, hoverText: PROFILE, href: "/apps/profile" },
  { icon: <RiTodoFill size={25} />, hoverText: TODOS, href: "/apps/todos" },
  {
    icon: <FaStopwatch size={25} />,
    hoverText: STOPWATCH,
    href: "/apps/stopwatch",
  },
];

export const ROUTES = {
  api: {
    auth: {
      signin: "/api/auth/signin",
      signup: "/api/auth/signup",
      logout: "/api/auth/logout",
    },
    notes: "/api/notes",
    todos: "/api/todos",
    user: {
      getUser: "/api/users/getUser/",
    },
  },
  page: {
    protected: {
      calculator: "/apps/calculator",
      profile: "/apps/profile",
      todos: "/apps/todos",
      notes: "/apps/notes",
      stopwatch: "/apps/stopwatch",
    },
    signup: "/signup",
    index: "/",
  },
};

export const DEV_ENV_URL = "http://localhost:3000";

export const DEV_ENV = "development";

export const PROD_ENV = "production";
