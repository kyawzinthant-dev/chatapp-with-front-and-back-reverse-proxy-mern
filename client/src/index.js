import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import { applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import "./index.css";


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
