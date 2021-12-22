import React from "react";
import { useSelector, useDispatch } from "react-redux";

const UserSub = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <h2>User의 서브페이지</h2>

      <ul>
        {item.info.flag &&
          item.info.hobby?.map((e, i) => {
            return <li key={i}>{e}</li>;
          })}
      </ul>
      {`item.info.flag = ${item.info.flag}`}

      <button onClick={() => dispatch({ type: "TOGGLE_HOBBY" })}>
        취미 토글
      </button>
    </>
  );
};

export default UserSub;
