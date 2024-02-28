import AddTodo from "./AddTodo";
import AllTodos from "./AllTodos";
import TodosHeader from "./TodosHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateTodo from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

function TodoWindow() {
  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      <TodosHeader />
      <div className="flex-1 px-2 py-2 w-full"></div>
    </section>
  );
}

export default TodoWindow;
