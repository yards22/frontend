import React from "react";
import MTodo from "../Logic/Model/MTodo";
import { useStores } from "../Logic/Providers/StoresProviders";
interface TodoItemProps {
  todo: MTodo;
}
function TodoItem(props: TodoItemProps) {
  const { todoStore } = useStores();
  return (
    <div>
      <p>{props.todo.title}</p>
      <p>{props.todo.description}</p>
      <button
        onClick={() => {
          todoStore.deleteTodo(props.todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
