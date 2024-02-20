import React from "react";
import WindowHeader from "../SharedComponents/WindowHeader";
import { TODOS } from "@/helpers/Constants";

function TodosHeader() {
  return <WindowHeader windowName={TODOS}></WindowHeader>;
}

export default TodosHeader;
