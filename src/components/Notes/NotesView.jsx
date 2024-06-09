import { ScrollArea } from "@/components/ui/scroll-area";
import NotesCard from "./NotesCard";
import Loader from "../SharedComponents/Loader";

function NotesView({
  openEditDialog,
  notesData,
  isFetchingError,
  isFetchingPending,
  fetchError,
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
      {notesData && notesData.length > 0 ? (
        notesData.map((note, i) => (
          <NotesCard key={i} note={note} openEditDialog={openEditDialog} />
        ))
      ) : (
        <div className="flex w-full justify-center items-center">
          <p className="font-mono tracking-wider text-sm sm:text-base uppercase">
            No Notes Available...
          </p>
        </div>
      )}
    </ScrollArea>
  );
}

export default NotesView;
