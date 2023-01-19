import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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
      await addDoc(collection(dbService, "todos"), payload);
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
      await deleteDoc(doc(dbService, "todos", payload));
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
      // onSnapShot은 비동기 함수이기 때문에 나중에 실행된다
      // 고로 getDocs를 사용했다
      const q = query(
        collection(dbService, 'todos'),
        orderBy('createdAt', 'desc')
      );
      const newArr: any = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const newObj = {
          id: doc.id,
          ...doc.data(),
        };
        newArr.push(newObj);
      });

      return thunkAPI.fulfillWithValue(newArr);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// crateSlice, extraReducer
const todosThunk = createSlice({
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
      console.log("state.todos: ", state.todos);
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      // console.log("state.isLoading: ", state.isLoading);
      // console.log("state.todos: ", state.todos);
      // console.log("action.payload: ", action.payload);
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export action creator, reducer
export const { addTodo, deleteTodo, switchTodo, getTodos }: any =
  todosThunk.actions;
export default todosThunk.reducer;
