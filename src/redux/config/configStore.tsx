import { combineReducers, createStore } from "redux";
import todos from "../modules/todos";

const rootReducer = combineReducers({
  todos: todos,
});

const store = createStore(rootReducer)

export default store;

export type RootState = ReturnType<typeof rootReducer>;
