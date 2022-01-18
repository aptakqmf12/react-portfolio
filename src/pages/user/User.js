import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getWholeUser } from "../../redux/actions/userActions";

const User = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWholeUser());
    return () => {};
  }, []);

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>현재 회원가입된 회원</h2>

      <div>
        {item.reducer.allUserData?.map((e) => {
          return <div key={e.userId}>{e.name}</div>;
        })}
      </div>
    </>
  );
};

export default User;
