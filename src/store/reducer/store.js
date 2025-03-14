import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolist/todolistSlice";

const store = configureStore({
  reducer: {
    todolist: todolistReducer
  }
});

export default store;