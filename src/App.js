import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import UserSub from "./pages/UserSub";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      김태완
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />}>
          <Route path="" element={<UserSub />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
