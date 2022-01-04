import React, { useState } from "react";

import Production from "../components/Production";
import Loading from "../components/common/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 500);
  return (
    <>
      {loading && <Loading />}
      <Production />
    </>
  );
};

export default Home;
