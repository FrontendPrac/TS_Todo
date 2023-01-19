import React from "react";
import { DataType } from "../App";
import { useDispatch } from "react-redux";
import { deleteTodo, switchTodo } from "../redux/modules/todosSlice";
import { AppDispatch } from "../redux/config/configStoreSlice";

type Props = {
  todos: DataType[];
  todo: DataType;
};

const Todo = ({ todos, todo }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const onClickSwithHandler = () => {
    dispatch(switchTodo(todo.id));
  };

  const onClickDeleteHandler = () => {
    dispatch(deleteTodo(todo.id));
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
