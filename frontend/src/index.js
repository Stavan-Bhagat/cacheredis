import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
