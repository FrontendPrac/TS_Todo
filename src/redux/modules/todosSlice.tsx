import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState: any = {
  todos: [],
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
        todos: state.todos.filter(
          (todo: TodoType) => todo.id !== action.payload
        ),
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
