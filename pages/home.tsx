import React from "react";
import NewTodo from "../Organs/NewTodo";
import TodoList from "../Organs/TodoList";
import TodoStatus from "../Organs/TodoStatus";

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <NewTodo />
      <TodoStatus />
      <TodoList />
    </div>
  );
}

export default Home;
