import React from "react";
import styled from "styled-components";

const Item = styled.div`
  position: relative;
  height: 300px;

  .img-skeleton {
    margin-bottom: 1rem;
    background-color: #eee;
  }
  .title-skeleton {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  .price-skeleton {
    font-size: 1.4rem;
  }
  .button-skeleton {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 0;
    top: 0;
    transition: 0.2s all ease-out;
    font-size: 2rem;
    &.red {
      color: red;
    }
  }
`;

const ProductionSkeleton = () => {
  return (
    <Item>
      <div className="img-skeleton">1</div>
      <div className="title-skeleton">2</div>
      <div className="price-skeleton">원</div>
      <button className="button-skeleton">❤</button>
    </Item>
  );
};

export default ProductionSkeleton;
