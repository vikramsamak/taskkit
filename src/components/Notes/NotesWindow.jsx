import React from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { NOTES } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";

function NotesWindow() {
  return (
    <AppWindow>
      <AppWindowHeader windowName={NOTES}></AppWindowHeader>
      <AppMainSection>{/*NOTES UI PART */}</AppMainSection>
    </AppWindow>
  );
}

export default NotesWindow;
