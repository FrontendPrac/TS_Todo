import Input from "./components/Input";
import TodoList from "./components/TodoList";

// import { useSelector } from "react-redux";
// import { RootState } from "./redux/config/configStoreSlice";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "./firebase/firebase";
import { useEffect, useState } from "react";

export type DataType = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

function App() {
  // const todos = useSelector((state: RootState) => state.todos.todos);
  // console.log("todos: ", todos);

  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc") // collection 내의 도큐먼트들을 createdAt 속성을 내림차순으로 쿼리한다
    );

    onSnapshot(q, (snapshot) => {
      // 쿼리안에 담긴 collection 내의 변화가 생길 때 마다 콜백함수를 매번 실행한다
      const newArr: any = [];
      snapshot.docs.map((doc) => {
        const newObj = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        newArr.push(newObj);
        setTodos(newArr);
        // console.log("newArr: ", newArr);
        // console.log("newObj: ", newObj);
      });
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <Input todos={todos} />
      <TodoList isActive={true} todos={todos} />
      <TodoList isActive={false} todos={todos} />
    </div>
  );
}

export default App;
