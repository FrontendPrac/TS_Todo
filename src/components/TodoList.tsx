import React from "react";
import { DataType } from "../App";
import Todo from "./Todo";

type Props = {
  isActive: boolean;
  todos: DataType[];
  setTodos: React.Dispatch<React.SetStateAction<DataType[]>>;
};

const TodoList = ({ isActive, todos, setTodos }: Props) => {
  return (
    <>
      <h4>{isActive === true ? "해야할 것" : "완료된 것"}</h4>
      {todos
        .filter((todo) => todo.isDone !== isActive)
        .map((todo) => {
          return (
            <Todo
              todos={todos}
              setTodos={setTodos}
              key={todo.id}
              todo={todo}
            />
          );
        })}
    </>
  );
};

export default TodoList;
