import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App/App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Store/Reducers/reducers";
import { applyMiddleware } from "redux";
import logger from "redux-logger";

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
