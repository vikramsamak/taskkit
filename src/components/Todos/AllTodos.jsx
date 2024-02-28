"use client";
import React from "react";

function AllTodos() {
  const todos = [
    {
      title: "Complete project report",
      details: "Something.........",
      status: "pending",
      dueDate: "2024-02-28",
    },
    {
      title: "Buy groceries",
      details: "Something.........",
      status: "pending",
      dueDate: "2024-02-25",
    },
  ];

  const headings = ["Title", "Status", "Due Date"];

  return <div className="h-full"></div>;
}

export default AllTodos;
