import { ScrollArea } from "@/components/ui/scroll-area";
import NotesCard from "./NotesCard";
import { useQuery } from "@tanstack/react-query";
// import { useAuthContext } from "@/Contexts/SessionProvider";
import { getBaseURl } from "@/helpers/helperFunctions";
import { NOTES, ROUTES } from "@/helpers/Constants";
import axios from "axios";
import Loader from "../SharedComponents/Loader";

function NotesView({ openEditDialog }) {
  // const authUSer = useAuthContext();
  // const notesQuery = [authUSer._id, NOTES];

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

  const { data, isError, isPending, error } = useQuery({
    queryKey: notesQuery,
    queryFn: getNotes,
  });

  return (
    <ScrollArea className="grow h-full px-2 py-2">
      {isError && (
        <div className="flex w-full justify-center items-center">
          <p>{error}</p>
        </div>
      )}
      {isPending && (
        <div className="flex w-full justify-center items-center">
          <Loader />
        </div>
      )}
      {data &&
        data.map((note, i) => (
          <NotesCard key={i} note={note} openEditDialog={openEditDialog} />
        ))}
    </ScrollArea>
  );
}

export default NotesView;
