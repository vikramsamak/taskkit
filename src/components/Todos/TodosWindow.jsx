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

  return (
    <AppWindow>
      <AppWindowHeader windowName={TODOS} />
      <AppMainSection>
        <AppDailog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          buttonText={"Add New Todo"}
          dialogContent={
            <TodoForm editTodo={editTodo} setIsModalOpen={setIsModalOpen} />
          }
          dialogTitle={editTodo ? "Update Todo" : "Create New Todo"}
        />
      </AppMainSection>
      <TodosView  openEditDialog={openEditDialog} />
    </AppWindow>
  );
}

export default TodosWindow;
