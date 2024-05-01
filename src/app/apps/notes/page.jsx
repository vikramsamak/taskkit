import NotesWindow from "@/components/Notes/NotesWindow";
import PageView from "@/components/SharedComponents/PageView";
import React from "react";

function page() {
  return <PageView window={<NotesWindow />}></PageView>;
}

export default page;
