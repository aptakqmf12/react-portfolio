import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default () => {
  const [state, setState] = useState();
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, "user"));
      setState(
        data.docs.map((e) => {
          return { ...e.data(), id: e.id };
        })
      );
    };

    getData();
  }, []);
  return [state, setState];
};
