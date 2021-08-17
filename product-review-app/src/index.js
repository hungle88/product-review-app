import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducers/reducer";
import { connect } from "react-redux";
import axios from "axios";

const rootReducer = combineReducers({
  productsReducer: reducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      return next(action);
    };
  };
};

const myStore = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
