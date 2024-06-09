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

function NotesWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
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

  const createNote = async (notesData) => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.notes.createNote}`;
    try {
      const res = await axios.post(URL, notesData);
      if (res.data.message) {
        return res.data.message;
      }
      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: createData,
    isError: iscreateError,
    error: createError,
    isPending: iscreatePending,
    mutate: createMutate,
  } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
  });

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

  const upadteNote = async (noteData) => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.notes.updateNote}`;
    try {
      const res = await axios.put(URL, noteData);
      if (res.data.message) {
        return res.data.message;
      }
      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: upadteData,
    isError: isupdateError,
    error: updateError,
    isPending: isupdatePending,
    mutate: updateMutate,
  } = useMutation({
    mutationFn: upadteNote,
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
  });

  if (createData || upadteData) {
    if (editNote) {
      toast.success(upadteData);
    } else {
      toast.success(createData);
    }
  }

  if (iscreateError || isupdateError) {
    if (editNote) {
      toast.error(updateError);
    } else {
      toast.error(createError);
    }
  }

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
              iscreatePending={iscreatePending}
              createMutate={createMutate}
              isupdatePending={isupdatePending}
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
      />
    </AppWindow>
  );
}

export default NotesWindow;
