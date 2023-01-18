import { v4 as uuidv4 } from "uuid";

// action value
const ADD_TODO = "ADD_TODO" as const;
const DELETE_TODO = "DELETE_TODO" as const;
const SWITCH_TODO = "SWITCH_TODO" as const;

// action creator
export const addTodo = (payload: object) => {
  return {
    type: ADD_TODO,
    payload: payload,
  };
};

export const deleteTodo = (payload: string) => {
  return {
    type: DELETE_TODO,
    payload: payload,
  };
};

export const switchTodo = (payload: string) => {
  return {
    type: SWITCH_TODO,
    payload: payload,
  };
};

// action object type
type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof switchTodo>;

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

//reducer
function todos(state = initialState, action: TodosAction) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: any) => {
          return todo.id !== action.payload;
        }),
      };
    case SWITCH_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: any) => {
          if (todo.id === action.payload) {
            return { ...todo, isDone: !todo.isDone };
          } else {
            return todo;
          }
        }),
      };
    default:
      return state;
  }
}

export default todos;
