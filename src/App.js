import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPage from "./pages/MyPage";
import User from "./pages/user/User";
import Ktw from "./pages/user/Ktw";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";

import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const item = useSelector((state) => state);

  const RequireAuth = ({ children, redirectTo }) => {
    return item.isAuth ? <MyPage /> : <Login />;
  };
  return (
    <div className="wrap">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="user/*" element={<User />}>
          <Route path="ktw" element={<Ktw />} />
        </Route>
        <Route
          path="MyPage"
          element={<RequireAuth redirectTo="login"></RequireAuth>}
        />
      </Routes>
    </div>
  );
};

export default App;
