import React from "react";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div>여기는 About</div>
      <span>몸무게는 ? {item.weight}</span>
      <button onClick={() => dispatch({ type: "ADD_WEIGHT" })}>
        몸무게 추가!
      </button>
    </>
  );
};

export default About;
