import React from "react";
import styled from "styled-components";

const Item = styled.div`
  position: relative;
  height: 300px;

  @keyframes ani {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #dfdfdf;
    }
    100% {
      background-color: #eee;
    }
  }

  .ani {
    position: relative;
  }

  .ani::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: #999;
    animation: ani 2s infinite;
  }

  .img-skeleton {
    margin-bottom: 1rem;
    background-color: #eee;
    height: 235px;
  }
  .title-skeleton {
    width: 70%;
    height: 1.8rem;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    background-color: #eee;
  }
  .price-skeleton {
    width: 90%;
    height: 1.4rem;
    font-size: 1.4rem;
    background-color: #eee;
  }
  .button-skeleton {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 0;
    top: 0;
    font-size: 2rem;
    color: White;
    text-shadow: 1px 1px 0.5px black;
  }
`;

const ProductionSkeleton = () => {
  return (
    <Item>
      <div className="img-skeleton ani"></div>
      <div className="title-skeleton ani"></div>
      <div className="price-skeleton ani"></div>
      <button className="button-skeleton">❤</button>
    </Item>
  );
};

export default ProductionSkeleton;
