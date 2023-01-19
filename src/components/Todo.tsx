import React from "react";
import { DataType } from "../App";
import { useDispatch } from "react-redux";
import { deleteTodo, switchTodo } from "../redux/modules/todosSlice";
import { AppDispatch } from "../redux/config/configStoreSlice";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase/firebase";

type Props = {
  todos: DataType[];
  todo: DataType;
};

const Todo = ({ todos, todo }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const onClickSwithHandler = async () => {
    dispatch(switchTodo(todo.id));
    await updateDoc(doc(dbService, "todos", todo.id), {
      isDone: !todo.isDone,
    });
  };

  const onClickDeleteHandler = async () => {
    dispatch(deleteTodo(todo.id));
    await deleteDoc(doc(dbService, "todos", todo.id));
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
