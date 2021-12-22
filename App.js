import React from "react";
import Home from "./component/Home";
import About from "./component/About";
import User from "./component/User";
import UserSub from "./component/UserSub";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
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
