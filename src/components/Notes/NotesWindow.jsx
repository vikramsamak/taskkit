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
  const [createSuccessMessage, setCreateSuccessMessage] = useState("");
  const [createErrorMessage, setCreateErrorMessage] = useState("");
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");
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
      return Promise.reject(error);
    }
  };

  const {
    data: createData,
    isError: isCreateError,
    error: createError,
    isPending: isCreatePending,
    mutate: createMutate,
  } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      setCreateSuccessMessage(data);
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
    onError: (error) => {
      setCreateErrorMessage(error.message);
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
      return Promise.reject(error);
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

  const updateNote = async (noteData) => {
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
      return Promise.reject(error);
    }
  };

  const {
    data: updateData,
    isError: isUpdateError,
    error: updateError,
    isPending: isUpdatePending,
    mutate: updateMutate,
  } = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      setUpdateSuccessMessage(data);
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
    onError: (error) => {
      setUpdateErrorMessage(error.message);
    },
  });

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
    if (createSuccessMessage) {
      toast.success(createSuccessMessage);
      setCreateSuccessMessage("");
    }

    if (updateSuccessMessage) {
      toast.success(updateSuccessMessage);
      setUpdateSuccessMessage("");
    }

    if (deleteSuccessMessage) {
      toast.success(deleteSuccessMessage);
      setDeleteSuccessMessage("");
    }

    if (createErrorMessage) {
      toast.error(createErrorMessage);
      setCreateErrorMessage("");
    }

    if (updateErrorMessage) {
      toast.error(updateErrorMessage);
      setUpdateErrorMessage("");
    }

    if (deleteErrorMessage) {
      toast.error(deleteErrorMessage);
      setDeleteErrorMessage("");
    }
  }, [
    createSuccessMessage,
    updateSuccessMessage,
    deleteSuccessMessage,
    createErrorMessage,
    updateErrorMessage,
    deleteErrorMessage,
  ]);

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
