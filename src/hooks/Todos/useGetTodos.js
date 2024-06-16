import { ROUTES } from "@/helpers/Constants";
import { getBaseURl } from "@/helpers/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetTodo = (queryKey) => {
  const getNotes = async () => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.todos.getTodos}`;
    try {
      const res = await axios.get(URL);
      if (res.data) {
        return res.data.todos;
      }
      if (res.data.error) {
        return Promise.reject(res.data.error);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const { data, isError, isPending, error } = useQuery({
    queryKey: queryKey,
    queryFn: getNotes,
  });

  return { data, isError, isPending, error };
};

export default useGetTodo;
