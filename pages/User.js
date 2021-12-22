import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const User = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <p>이름은 {item.name}</p>
      <button onClick={() => dispatch({ type: "CHANGE_NAME" })}>
        이름바꾸기
      </button>
      <div>
        <Link to="/UserSub">UserSub</Link>
        <Outlet />
      </div>
    </>
  );
};

export default User;
