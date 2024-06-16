import { AiFillCalculator } from "react-icons/ai";
import { RiTodoFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

export const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

export const OPERATORS = ["+", "-", "*", "/"];

export const CALCULATOR = "CALCULATOR";

export const TODOS = "TODOS";

export const HOME = "HOME";

export const PROFILE = "PROFILE";

export const STOPWATCH = "STOPWATCH";

export const NOTES = "NOTES";

export const TOKEN = "token";

export const ICONS = [
  {
    icon: <AiFillCalculator size={25} />,
    hoverText: CALCULATOR,
    href: "/apps/calculator",
  },
  {
    icon: <RiTodoFill size={25} />,
    hoverText: TODOS,
    href: "/apps/todos",
  },
  {
    icon: <FaUser size={25} />,
    hoverText: PROFILE,
    href: "/apps/profile",
  },
  {
    icon: <FaStopwatch size={25} />,
    hoverText: STOPWATCH,
    href: "/apps/stopwatch",
  },
  {
    icon: <FaNoteSticky size={25} />,
    hoverText: NOTES,
    href: "/apps/notes",
  },
];

export const ROUTES = {
  api: {
    auth: {
      signin: "/api/auth/signin",
      signup: "/api/auth/signup",
      logout: "/api/auth/logout",
    },
    notes: {
      createNote: "/api/notes/createnote",
      getNotes: "/api/notes/getnotes",
      updateNote: "/api/notes/updatenote",
      deleteNote: "/api/notes/deletenote",
    },
    todos: {
      createTodo: "/api/todos/createtodo",
      getTodos: "/api/todos/gettodos",
      updateTodo: "/api/todos/updatetodo",
      deleteTodo: "/api/todos/deletetodo",
    },
  },
  page: {
    protected: {
      calculator: "/apps/calculator",
      profile: "/apps/profile",
      todos: "/apps/todos",
      notes: "/apps/notes",
      stopwatch: "/apps/stopwatch",
      notes: "/apps/notes",
    },
    signup: "/signup",
    index: "/",
  },
};

export const DEV_ENV_URL = "http://localhost:3000";

export const DEV_ENV = "development";

export const PROD_ENV = "production";

export const NOT_STARTED_TODO_STATUS = "Not started";

export const IN_PROGRESS_TODO_STATUS = "In Progress";

export const COMPLETED_TODO_STATUS = "Completed";

export const TODOS_STATUS = [
  NOT_STARTED_TODO_STATUS,
  IN_PROGRESS_TODO_STATUS,
  COMPLETED_TODO_STATUS,
];

export const TODOS_DEFAULT_STATUS = "Not started";
