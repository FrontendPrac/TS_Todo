import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DataType } from "../App";

import { addTodo } from "../redux/modules/todos";
import { useDispatch } from "react-redux";

type Props = {
  todos: DataType[];
};

const Input = ({ todos }: Props) => {
  // console.log("todos: ", todos);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onContentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === "" || content === "") {
      alert("빈 칸을 채워주세요");
    } else {
      const newTodo = {
        id: uuidv4(),
        title: title,
        content: content,
        isDone: false,
      };

      dispatch(addTodo(newTodo));

      setTitle("");
      setContent("");
    }
  };

  // console.log("title: ", title);
  // console.log("content: ", content);
  // console.log("todos: ", todos);

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        제목:
        <input value={title} type="text" onChange={onTitleHandler} />
        내용:
        <input value={content} type="text" onChange={onContentHandler} />
        <button>추가</button>
      </form>
    </>
  );
};

export default Input;
