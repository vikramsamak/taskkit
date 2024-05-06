"use client";
import React, { useState } from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { NOTES } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";
import AppDailog from "../SharedComponents/AppDailog";
import NotesView from "./NotesView";
import NotesForm from "./NotesForm";

function NotesWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppWindow>
      <AppWindowHeader windowName={NOTES}></AppWindowHeader>
      <AppMainSection>
        <AppDailog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          buttonText={"Add New Note"}
          dialogContent={<NotesForm setIsModalOpen={setIsModalOpen} />}
          dialogTitle={"Create New Note"}
        />
      </AppMainSection>
      <NotesView setIsModalOpen={setIsModalOpen} />
    </AppWindow>
  );
}

export default NotesWindow;
