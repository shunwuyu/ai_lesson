import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer } from "./reducer";
import counterReducer from "./count";

const rootReducer = combineReducers({
    counter: counterReducer,
    // user: userReducer,
  });

// const store = configureStore({
//   reducer: reducer,
// });

const store = configureStore({
    reducer: rootReducer,
});

export default store;