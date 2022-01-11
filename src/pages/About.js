import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getWholeUser } from "../redux/actions/userActions";

const About = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWholeUser());
    return () => {};
  }, []);

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>about me</h2>

      <div>{item.weight}kg</div>
    </>
  );
};

export default About;
