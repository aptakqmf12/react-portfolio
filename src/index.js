import React from "react";
import ReactDom from "react-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDom.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Header />
          <App />
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  </>,

  document.getElementById("root")
);
