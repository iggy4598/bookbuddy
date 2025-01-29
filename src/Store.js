import { configureStore } from "@reduxjs/toolkit";
import api from "./store/api";
import accountReducer from "./redux/slices/AccountSlice";
import loginReducer from "./redux/slices/LoginSlice";
import registerReducer from "./redux/slices/RegisterSlice";
import booksReducer from "./redux/slices/BooksSlice";
import singleBookReducer from "./redux/slices/SingleBookSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    login: loginReducer,
    register: registerReducer,
    books: booksReducer,
    singleBook: singleBookReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
