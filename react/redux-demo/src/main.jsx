import React from "react";
import ReactDOM, {createRoot} from "react-dom/client";
import "./index.css";
import App2 from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
