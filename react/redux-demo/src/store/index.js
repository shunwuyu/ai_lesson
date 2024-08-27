import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

// const rootReducer = combineReducers({
//     counter: counterReducer,
//     user: userReducer,
//   });

const store = configureStore({
  reducer: reducer,
});

export default store;