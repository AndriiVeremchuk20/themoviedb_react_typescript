import { combineReducers } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./App/reducer";
import { movieReducer } from "./Movie/reducer";
import { moviesReducer } from "./Movies/reducer";
import { userReducer } from "./User/reducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  app: appReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
