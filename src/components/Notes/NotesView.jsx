import { ScrollArea } from "@/components/ui/scroll-area";
import NotesCard from "./NotesCard";

function NotesView() {
  return (
    <ScrollArea className="grow h-full px-2 py-2">
      <NotesCard />
    </ScrollArea>
  );
}

export default NotesView;
