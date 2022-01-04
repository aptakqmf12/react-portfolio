import React, { useState } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const StyledLoadingBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 2.5rem;
`;

const Loading = () => {
  return (
    <>
      <StyledLoadingBox>
        <ClipLoader /> <span>Loading...</span>
      </StyledLoadingBox>
    </>
  );
};

export default Loading;
