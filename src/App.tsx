import React, { useState } from "react";
import Input from "./components/Input";
// import Todo from "./components/Todo";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

export type DataType = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

function App() {
  const initialState = [
    {
      id: uuidv4(),
      title: "타입스크립트",
      content: "영진님, 감사합니다",
      isDone: false,
    },
    {
      id: uuidv4(),
      title: "자바스크립트",
      content: "쉽지 않군요",
      isDone: true,
    },
  ];

  // console.log("initialState: ", initialState);

  const [todos, setTodos] = useState<DataType[]>(initialState as DataType[]);

  // console.log("todos: ", todos);

  return (
    <div className="App">
      <Input todos={todos} setTodos={setTodos} />
      <TodoList isActive={true} todos={todos} setTodos={setTodos} />
      <TodoList isActive={false} todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
