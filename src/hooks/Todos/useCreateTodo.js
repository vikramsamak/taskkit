import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ROUTES } from "@/helpers/Constants";
import { getBaseURl } from "@/helpers/helperFunctions";
import { toast } from "sonner";

const useCreateTodo = (queryKey) => {
  const queryClient = useQueryClient();

  const createTodo = async (todosData) => {
    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.todos.createTodo}`;
    try {
      const res = await axios.post(URL, todosData);
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

  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      }
      toast.error(error);
    },
  });

  return {
    mutate,
    isPending,
  };
};

export default useCreateTodo;
