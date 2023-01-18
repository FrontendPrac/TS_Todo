import Input from "./components/Input";
import TodoList from "./components/TodoList";

import { useSelector } from "react-redux";
import { RootState } from "./redux/config/configStore";

export type DataType = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

function App() {
  const todos = useSelector((state: RootState) => state.todos.todos);

  // console.log("todos: ", todos);

  return (
    <div className="App">
      <Input todos={todos} />
      <TodoList isActive={true} todos={todos} />
      <TodoList isActive={false} todos={todos} />
    </div>
  );
}

export default App;
