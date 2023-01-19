import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// initial state
const initialState: any = {
  todos: [
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
  ],
};

// todo type
interface TodoType {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

// action value, action creator, reducer
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    },

    deleteTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo: TodoType) => todo.id !== action.payload),
      };
    },

    switchTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo: TodoType) => {
          if (todo.id === action.payload) {
            return { ...todo, isDone: !todo.isDone };
          } else {
            return todo;
          }
        }),
      };
    },
  },
});

// export action creator, reducer
export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
