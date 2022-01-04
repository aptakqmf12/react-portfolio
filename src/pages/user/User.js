import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const User = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  const [prd, setPrd] = useState("");

  const fetchData = async () => {
    const res = await axios.get(
      "https://c6770e07-602a-4155-be11-6198182b35c4.mock.pstmn.io/production"
    );
    setPrd(res.data);
    console.log(res.data);
  };

  const onDeleteList = (e) => {
    console.log(e.target.dataset.id);
    axios.post(
      "https://c6770e07-602a-4155-be11-6198182b35c4.mock.pstmn.io/postPrd",
      {
        id: 999,
        title: "post",
        price: 9999,
        wished: true,
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h2>User List</h2>
      <div>
        {prd &&
          prd.map((e, i) => {
            return (
              <>
                <div key={i}>
                  {e.title}
                  <button data-id={i} onClick={onDeleteList}>
                    delete
                  </button>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default User;
