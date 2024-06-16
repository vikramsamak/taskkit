"use client";
import React, { useEffect, useState } from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { TODOS } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";
import AppDailog from "../SharedComponents/AppDailog";
import useCurrentUser from "@/hooks/useCurrentUser";
import TodoForm from "./TodoForm";
import TodosView from "./TodosView";
import useGetTodo from "@/hooks/Todos/useGetTodos";
import useCreateTodo from "@/hooks/Todos/useCreateTodo";
import useUpdateTodo from "@/hooks/Todos/useUpdateTodos";
import useDeleteTodo from "@/hooks/Todos/useDeleteTodo";

function TodosWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const { user } = useCurrentUser();

  const todosQuery = [user?.id, TODOS];

  useEffect(() => {
    if (!isModalOpen) {
      setEditTodo(null);
    }
  }, [isModalOpen]);

  const openEditDialog = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  };

  const {
    data: todosData,
    error: fetchError,
    isError: isFetchingError,
    isPending: isFetchingPending,
  } = useGetTodo(todosQuery);

  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateTodo(todosQuery);

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateTodo(todosQuery);

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteTodo(todosQuery);

  return (
    <AppWindow>
      <AppWindowHeader windowName={TODOS} />
      <AppMainSection>
        <AppDailog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          buttonText={"Add New Todo"}
          dialogContent={
            <TodoForm
              editTodo={editTodo}
              setIsModalOpen={setIsModalOpen}
              isCreatePending={isCreatePending}
              createMutate={createMutate}
              isUpdatePending={isUpdatePending}
              updateMutate={updateMutate}
            />
          }
          dialogTitle={editTodo ? "Update Todo" : "Create New Todo"}
        />
      </AppMainSection>
      <TodosView
        openEditDialog={openEditDialog}
        todosData={todosData}
        isFetchingError={isFetchingError}
        isFetchingPending={isFetchingPending}
        fetchError={fetchError}
        isDeletePending={isDeletePending}
        deleteMutate={deleteMutate}
      />
    </AppWindow>
  );
}

export default TodosWindow;
