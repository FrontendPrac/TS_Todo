import React from "react";
import { DataType } from "../App";

type Props = {
  // isActive: boolean;
  todos: DataType[];
  setTodos: React.Dispatch<React.SetStateAction<DataType[]>>;
  todo: DataType;
};

const Todo = ({ todos, setTodos, todo }: Props) => {
  const onClickSwithHandler = () => {
    setTodos((todos) =>
      todos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, isDone: !t.isDone };
        } else {
          return t;
        }
      })
    );
  };

  const onClickDeleteHandler = () => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
  };

  return (
    <div style={{ border: "2px solid black" }}>
      <h5>{todo.title}</h5>
      <p>{todo.content}</p>
      <button onClick={onClickSwithHandler}>
        {todo.isDone === true ? "취소" : "완료"}
      </button>
      <button onClick={onClickDeleteHandler}>삭제</button>
    </div>
  );
};

export default Todo;
