import { ROUTES } from "@/helpers/Constants";
import { getBaseURl } from "@/helpers/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetNotes = (notesQuery) => {
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

  const { data, isError, isPending, error } = useQuery({
    queryKey: notesQuery,
    queryFn: getNotes,
  });

  return { data, isError, isPending, error };
};

export default useGetNotes;
