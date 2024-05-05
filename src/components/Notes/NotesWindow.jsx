import React from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { NOTES } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";
import AppDailog from "../SharedComponents/AppDailog";
import NotesView from "./NotesView";
import NotesForm from "./NotesForm";

function NotesWindow() {
  return (
    <AppWindow>
      <AppWindowHeader windowName={NOTES}></AppWindowHeader>
      <AppMainSection>
        <AppDailog
          buttonText={"Add New Note"}
          dialogContent={<NotesForm />}
          dialogTitle={"Create New Note"}
        />
      </AppMainSection>
      <NotesView />
    </AppWindow>
  );
}

export default NotesWindow;
