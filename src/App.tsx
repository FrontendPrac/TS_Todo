import Input from "./components/Input";
import TodoList from "./components/TodoList";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "./firebase/firebase";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/config/configStoreSlice";
import { __getTodos } from "./redux/modules/todosThunk";
import { createNoSubstitutionTemplateLiteral } from "typescript";

export type DataType = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
  createdAt: number;
};

function App() {
  // const [todos, setTodos] = useState([]);

  // const getTodos = () => {
  //   const q = query(
  //     collection(dbService, "todos"),
  //     orderBy("createdAt", "desc")
  //   );

  //   onSnapshot(q, (snapshot) => {
  //     const newArr: any = [];
  //     snapshot.docs.map((doc) => {
  //       const newObj = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       newArr.push(newObj);
  //       setTodos(newArr);
  //       // console.log("newArr: ", newArr);
  //       // console.log("newObj: ", newObj);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getTodos();
  // }, []);

  // const state = useSelector((state: RootState) => state.todos);
  // console.log("state: ", state);

  const { isLoading, error, todos } = useSelector((state: any) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  if (isLoading) {
    return <div>로딩 중 ...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="App">
      <Input todos={todos} />
      <TodoList isActive={true} todos={todos} />
      <TodoList isActive={false} todos={todos} />
    </div>
  );
}

export default App;
