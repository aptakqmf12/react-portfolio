import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getUser, getWholeUser } from "../redux/actions/userActions";

const About = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWholeUser());
  }, []);

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>UserDatas</h2>

      <div>
        {item.userData?.map((e) => {
          return <div>{e.name}</div>;
        })}{" "}
        입니다
      </div>
    </>
  );
};

export default About;
