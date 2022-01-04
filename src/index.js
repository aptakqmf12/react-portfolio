import React from "react";
import ReactDom from "react-dom";
import { Reset } from "styled-reset";
import { worker } from "./mocks/browser";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

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
