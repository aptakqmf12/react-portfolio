import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ADD_WEIGHT } from "../store";

const Hobby = styled.ul`
  li {
    color: #666;
  }
`;

const About = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>About</h2>

      <div style={{ marginBottom: "1rem" }}>
        {item.name}님의 몸무게 : {item.weight}
        <button onClick={() => dispatch({ type: ADD_WEIGHT })}>
          몸무게 추가!
        </button>
      </div>

      <Hobby style={{ marginBottom: "1rem" }}>
        {item.name}님의 취미
        {item.info.hobby.map((e) => (
          <li>{e}</li>
        ))}
      </Hobby>
    </>
  );
};

export default About;
