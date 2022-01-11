import React from "react";
import ReactDom from "react-dom";
import { Reset } from "styled-reset";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDom.render(
  <>
    <Provider store={store}>
      <Router>
        <Header />
        <App />
        <Footer />
      </Router>
    </Provider>
  </>,

  document.querySelector("#root")
);
