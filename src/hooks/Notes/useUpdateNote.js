import { ROUTES } from "@/helpers/Constants";
import { getBaseURl } from "@/helpers/helperFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const useUpdateNote = (notesQuery) => {
  const queryClient = useQueryClient();

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

  const { isPending, mutate } = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: notesQuery });
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      }
      toast.error(error);
    },
  });

  return { mutate, isPending };
};

export default useUpdateNote;
