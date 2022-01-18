import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getWholeUser } from "../redux/actions/userActions";

const About = () => {
  const item = useSelector((state) => state);

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>about me</h2>

      <div>{item.reducer.weight}kg</div>
    </>
  );
};

export default About;
