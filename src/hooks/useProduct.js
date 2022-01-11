import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "production"));
      setState(
        querySnapshot.docs.map((e) => {
          return { ...e.data(), id: e.id };
        })
      );
    };
    getData();
  }, []);
  return [state, setState];
};
