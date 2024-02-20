import PageView from "@/components/SharedComponents/PageView";
import TodoWindow from "@/components/Todos/TodoWindow";

function Todospage() {
  return <PageView window={<TodoWindow />}></PageView>;
}

export default Todospage;
