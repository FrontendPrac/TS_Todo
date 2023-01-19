import React from "react";
import { DataType } from "../App";
import Todo from "./Todo";

type Props = {
  isActive: boolean;
  todos: DataType[];
};

const TodoList = ({ isActive, todos }: Props) => {
  return (
    <>
      <h4>{isActive === true ? "해야할 것" : "완료된 것"}</h4>
      {todos
        ?.filter((todo) => todo.isDone !== isActive)
        ?.map((todo) => {
          return <Todo key={todo.createdAt} todos={todos} todo={todo} />;
        })}
    </>
  );
};

export default TodoList;
