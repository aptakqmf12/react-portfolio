import React, { useCallback } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPage from "./pages/MyPage";
import User from "./pages/user/User";
import Ktw from "./pages/user/Ktw";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import ProductionDetail from "./pages/ProductionDetail";

import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const item = useSelector((state) => state);

  const RequireAuth = useCallback(({ children, redirectTo }) => {
    return item.isAuth ? <MyPage /> : <Login />;
  }, []);
  return (
    <div className="wrap">
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />
        {/* About */}
        <Route path="about" element={<About />} />
        {/* User */}
        <Route path="user/*" element={<User />}>
          <Route path="ktw" element={<Ktw />} />
        </Route>
        {/* 상품상세페이지 (중첩라우팅) */}
        <Route path="/productionDetail/*" element={<ProductionDetail />}>
          <Route path=":id" element={<ProductionDetail />} />
        </Route>
        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp />} />
        {/* 마이페이지 */}
        <Route
          path="mypage"
          element={<RequireAuth redirectTo="login"></RequireAuth>}
        />
      </Routes>
    </div>
  );
};

export default App;
