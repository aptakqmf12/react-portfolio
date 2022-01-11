import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const User = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  const [prd, setPrd] = useState("");
  const [load, setLoad] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(
      "https://c6770e07-602a-4155-be11-6198182b35c4.mock.pstmn.io/production"
    );
    setPrd(res.data);
    console.log(res.data[1].title);
    setLoad(false);
  };

  const postData = async () => {
    const res = await axios.post(
      "https://c6770e07-602a-4155-be11-6198182b35c4.mock.pstmn.io/postPrd",
      {}
    );

    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h2>User List</h2>

      <div>
        {load && <div style={{ color: "blue" }}>Loading...</div>}
        {prd &&
          prd.map((e, i) => {
            return <div key={e.title}>{e.title}</div>;
          })}
      </div>

      <div>
        <button style={{ backgroundColor: "red" }} onClick={postData}>
          post
        </button>
      </div>
    </>
  );
};

export default User;
