import React, { useState, useMemo, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [signupName, setSignupName] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPw, setSignupPw] = useState("");

  const onChangeSignupName = (e) => {
    setSignupName(e.target.value);
  };
  const onChangeSignupId = (e) => {
    setSignupId(e.target.value);
  };
  const onChangeSignupPw = (e) => {
    setSignupPw(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, signupId, signupPw).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log(user);
      }
    );

    alert("회원가입이 완료되었습니다.");
    setSignupName("");
    setSignupId("");
    setSignupPw("");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>name</legend>
          <input
            value={signupName}
            onChange={onChangeSignupName}
            placeholder="이름"
            required
          />
          <legend>id</legend>
          <input
            value={signupId}
            onChange={onChangeSignupId}
            placeholder="아이디"
            required
          />
          <legend>password</legend>
          <input
            value={signupPw}
            onChange={onChangeSignupPw}
            placeholder="패스워드"
            required
          />
          <button type="submit">회원가입</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
