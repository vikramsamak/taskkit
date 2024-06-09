"use client";
import React, { useEffect, useState } from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { NOTES, ROUTES } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";
import AppDailog from "../SharedComponents/AppDailog";
import NotesView from "./NotesView";
import NotesForm from "./NotesForm";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getBaseURl } from "@/helpers/helperFunctions";
import axios from "axios";

function NotesWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const { user } = useCurrentUser();
  const notesQuery = [user?.id, NOTES];

  useEffect(() => {
    if (!isModalOpen) {
      setEditNote(null);
    }
  }, [isModalOpen]);

  const openEditDialog = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  const getNotes = async () => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.notes.getNotes}`;
    try {
      const res = await axios.get(URL);
      if (res.data) {
        return res.data.notes;
      }
      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: notesData,
    isError: isFetchingError,
    isPending: isFetchingPending,
    error: fetchError,
  } = useQuery({
    queryKey: notesQuery,
    queryFn: getNotes,
  });

  return (
    <AppWindow>
      <AppWindowHeader windowName={NOTES}></AppWindowHeader>
      <AppMainSection>
        <AppDailog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          buttonText={"Add New Note"}
          dialogContent={
            <NotesForm setIsModalOpen={setIsModalOpen} editNote={editNote} />
          }
          dialogTitle={editNote ? "Update Note" : "Create New Note"}
        />
      </AppMainSection>
      <NotesView
        openEditDialog={openEditDialog}
        notesData={notesData}
        isFetchingError={isFetchingError}
        isFetchingPending={isFetchingPending}
        fetchError={fetchError}
      />
    </AppWindow>
  );
}

export default NotesWindow;
