import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../../firebase/firebase";

// initial state
const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

// Thunk - createAsyncThuck, fulfillWithValue, rejectWithValue
export const __addTodo: any = createAsyncThunk(
  "addTodo",
  async (payload: any, thunkAPI) => {
    try {
      console.log("payload: ", payload);
      addDoc(collection(dbService, "todos"), payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo: any = createAsyncThunk(
  "deleteTodo",
  async (payload: string, thunkAPI) => {
    try {
      console.log("payload: ", payload);
      deleteDoc(doc(dbService, "todos", payload));
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __switchTodo: any = createAsyncThunk(
  "switchTodo",
  async (payload: any, thunkAPI) => {
    try {
      console.log("payload: ", payload);
      await updateDoc(doc(dbService, "todos", payload.id), {
        isDone: payload.isDone,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTodos: any = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const q = query(
        collection(dbService, "todos"),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (snapshot) => {
        const newArr: any = [];
        snapshot.docs.map((doc) => {
          const newObj = {
            id: doc.id,
            ...doc.data(),
          };
          newArr.push(newObj);
          // console.log("newArr: ", newArr);
          // console.log("newObj: ", newObj);
        });
        // console.log("newArr: ", newArr);
        return thunkAPI.fulfillWithValue(newArr);
      });
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// crateSlice, extraReducer
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // __addTodo
    [__addTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodo.fulfilled]: (state: any, action: any) => {
      console.log("action.payload: ", action.payload);
      console.log("state.todos: ", state.todos);
      console.log("state: ", state);
      state.isLoading = false;
      state.todos = [...state.todos, action.payload];
    },
    [__addTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // __deleteTodo
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = [
        ...state.todos.filter((todo: any) => todo.id !== action.payload),
      ];
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // __switchTodo
    [__switchTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__switchTodo.fulfilled]: (state: any, action) => {
      state.isLoading = false;
      state.todos = [
        ...state.todos.map((todo: any) => {
          if (todo.id === action.payload.id) {
            return { ...todo, isDone: action.payload.isDone };
          } else {
            return todo;
          }
        }),
      ];
    },
    [__switchTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // __getTodos
    [__getTodos.pending]: (state) => {
      // console.log("state.isLoading: ", state.isLoading);
      // console.log("state.todos: ", state.todos);
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      console.log("state.isLoading: ", state.isLoading);
      console.log("state.todos: ", state.todos);
      console.log("action.payload: ", action.payload);
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      // 에러가 나는 상황에 실행되는 코드
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export action creator, reducer
export const { addTodo, deleteTodo, switchTodo, getTodos }: any =
  todosSlice.actions;
export default todosSlice.reducer;
