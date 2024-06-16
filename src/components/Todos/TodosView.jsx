import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Loader from "../SharedComponents/Loader";
import TodoCard from "./TodoCard";

function TodosView({
  openEditDialog,
  todosData,
  isFetchingError,
  isFetchingPending,
  fetchError,
  isDeletePending,
  deleteMutate,
}) {
  return (
    <ScrollArea className="grow h-full px-2 py-2">
      {isFetchingError && (
        <div className="flex w-full justify-center items-center">
          <p>{fetchError}</p>
        </div>
      )}
      {isFetchingPending && (
        <div className="flex w-full justify-center items-center">
          <Loader />
        </div>
      )}
      {todosData && todosData.length > 0
        ? todosData.map((todo, i) => (
            <TodoCard
              key={i}
              todo={todo}
              openEditDialog={openEditDialog}
              isDeletePending={isDeletePending}
              deleteMutate={deleteMutate}
            />
          ))
        : !isFetchingPending && (
            <div className="flex w-full justify-center items-center">
              <p className="font-mono tracking-wider text-sm sm:text-base uppercase">
                No todos Available...
              </p>
            </div>
          )}
    </ScrollArea>
  );
}

export default TodosView;
