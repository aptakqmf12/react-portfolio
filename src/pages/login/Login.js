import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_TRUE } from "../../store";

const Login = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const idInput = useRef();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const collectIdPw = {
    id: localStorage.getItem("id"),
    password: localStorage.getItem("password"),
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (id === collectIdPw.id && pw === collectIdPw.password) {
      alert("로그인 성공!");
      await dispatch({ type: AUTH_TRUE });
      localStorage.setItem("isAuthorized", true);
      console.log(`item.isAuthorized : ${item.isAuthorized}`);
      navigate("/");
    } else {
      idInput.current.focus();
      alert("틀렸습니다");
    }
    setId("");
    setPw("");
  };
  return (
    <>
      {!item.isAuthrized ? (
        <div>
          <form onSubmit={onSubmit}>
            <fieldset>
              <legend>id</legend>
              <input
                value={id}
                onChange={onChangeId}
                ref={idInput}
                placeholder="아이디"
              />
              <legend>password</legend>
              <input value={pw} onChange={onChangePw} placeholder="패스워드" />
              <button type="submit">로그인</button>
            </fieldset>
          </form>
          {`입력ID : ${id}  입력pw : ${pw}`}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Login;
