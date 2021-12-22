import React from "react";
import ReactDom from "react-dom";
import Header from "./component/common/Header";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

const INITIAL_STATE = {
  name: "ktw",
  weight: 100,
  info: {
    flag: false,
    hobby: ["swimming", "dance", "singing"],
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_WEIGHT":
      return {
        ...state,
        weight: state.weight + 1,
      };
    case "CHANGE_NAME":
      if (state.name === "ktw") {
        return {
          ...state,
          name: "ldk",
        };
      } else {
        return {
          ...state,
          name: "ktw",
        };
      }
    case "TOGGLE_HOBBY":
      return {
        ...state,
        info: { flag: !state.flag },
      };

    default:
      return state;
  }
};

let store = createStore(reducer);

ReactDom.render(
  <>
    <Provider store={store}>
      <Router>
        <Header />
        <App />
      </Router>
    </Provider>
  </>,

  document.querySelector("#root")
);
