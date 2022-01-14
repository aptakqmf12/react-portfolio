import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { AUTH_TRUE } from "../../redux/actions/authActions";

const Login = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const idInput = useRef();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, id, pw)
      .then((userCredential) => {
        onAuthStateChanged(auth, (user) => {
          // if (!user) return;
          localStorage.setItem("loginedUserId", user.uid);
        });
        dispatch({ type: AUTH_TRUE });
        alert("로그인 되었습니다");
        navigate("/");
      })
      .catch((err) => {
        alert("아이디 비밀번호가 틀렸습니다.");
        idInput.current.focus();
      });

    setId("");
    setPw("");
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend>id</legend>
            <input
              type="email"
              value={id}
              onChange={onChangeId}
              ref={idInput}
              placeholder="아이디"
            />
            <legend>password</legend>
            <input
              type="password"
              value={pw}
              onChange={onChangePw}
              placeholder="패스워드"
            />
            <button type="submit">로그인</button>
          </fieldset>
        </form>
        <div>현재 로그인된 유저 :</div>
      </div>
    </>
  );
};

export default Login;
