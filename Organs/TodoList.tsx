import { useObserver } from "mobx-react-lite";
import { useEffect } from "react";
import TodoItem from "../Atoms/TodoItem";
import { useStores } from "../Logic/Providers/StoresProviders";

function TodoList() {
  const { todoStore } = useStores();
  useEffect(() => {
    todoStore.fetchTodoList();
  }, []);
  return useObserver(() => {
    const { todoList } = todoStore;
    return (
      <div>
        <h3> All Todo</h3>
        {todoList.map((item, index) => {
          return <TodoItem key={item.title + index} todo={item} />;
        })}
      </div>
    );
  });
}

export default TodoList;
