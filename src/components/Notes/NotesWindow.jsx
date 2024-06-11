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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBaseURl } from "@/helpers/helperFunctions";
import axios from "axios";
import { toast } from "sonner";
import useCreateNote from "@/hooks/Notes/useCreateNote";
import useGetNotes from "@/hooks/Notes/useGetNotes";
import useUpdateNote from "@/hooks/Notes/useUpdateNote";
import useDeleteNote from "@/hooks/Notes/useDeleteNote";

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

  const {
    data: notesData,
    error: fetchError,
    isError: isFetchingError,
    isPending: isFetchingPending,
  } = useGetNotes(notesQuery);

  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateNote(notesQuery);

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateNote(notesQuery);

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteNote(notesQuery);

  return (
    <AppWindow>
      <AppWindowHeader windowName={NOTES}></AppWindowHeader>
      <AppMainSection>
        <AppDailog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          buttonText={"Add New Note"}
          dialogContent={
            <NotesForm
              editNote={editNote}
              setIsModalOpen={setIsModalOpen}
              isCreatePending={isCreatePending}
              createMutate={createMutate}
              isUpdatePending={isUpdatePending}
              updateMutate={updateMutate}
            />
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
        isDeletePending={isDeletePending}
        deleteMutate={deleteMutate}
      />
    </AppWindow>
  );
}

export default NotesWindow;
