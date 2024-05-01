import React from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { TODOS } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";

function TodosWindow() {
  return (
    <AppWindow>
      <AppWindowHeader windowName={TODOS} />
      <AppMainSection>{/* TODO UI SECTIONS */}</AppMainSection>
    </AppWindow>
  );
}

export default TodosWindow;
