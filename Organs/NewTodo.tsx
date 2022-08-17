import { v4 as uuidv4 } from "uuid";
import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import MTodo from "../Logic/Model/MTodo";
import { useStores } from "../Logic/Providers/StoresProviders";

function NewTodo() {
  const stores = useStores();
  const [todo, setTodo] = useState<MTodo>({
    id: uuidv4(),
    title: "",
    description: "",
  });
  return useObserver(() => {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
        <h3> New Todo</h3>
        <input
          value={todo.title}
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
        <textarea
          value={todo.description}
          placeholder="Description"
          onChange={(e) => {
            setTodo({ ...todo, description: e.target.value });
          }}
        />
        <button
          onClick={() => {
            stores.todoStore.createTodo(todo);
            setTodo({ id: "", title: "", description: "" });
          }}
        >
          Create
        </button>
      </div>
    );
  });
}

export default NewTodo;
