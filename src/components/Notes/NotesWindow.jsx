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

function NotesWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const notesQuery = [user?.id, NOTES];

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      setEditNote(null);
    }
  }, [isModalOpen]);

  const openEditDialog = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateNote(notesQuery);

  const {
    data: notesData,
    error: fetchError,
    isError: isFetchingError,
    isPending: isFetchingPending,
  } = useGetNotes(notesQuery);

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateNote(notesQuery);

  const deleteNote = async (noteId) => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.notes.deleteNote}?noteId=${noteId}`;
    try {
      const res = await axios.delete(URL);
      if (res.data.message) {
        return res.data.message;
      }
      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const {
    data: deleteData,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeletePending,
    mutate: deleteMutate,
  } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      setDeleteSuccessMessage(data);
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
    onError: (error) => {
      setDeleteErrorMessage(error.message);
    },
  });

  useEffect(() => {
    if (deleteSuccessMessage) {
      toast.success(deleteSuccessMessage);
      setDeleteSuccessMessage("");
    }

    if (deleteErrorMessage) {
      toast.error(deleteErrorMessage);
      setDeleteErrorMessage("");
    }
  }, [deleteErrorMessage]);

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
