import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.div`
  position: relative;

  img {
    margin-bottom: 1rem;
    transition: 0.2s all ease-out;
    &:hover {
      transform: scale(1.03);
    }
  }
  .title {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  .price {
    font-size: 1.4rem;
  }
  button {
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

const ProductionItem = ({
  prd_name,
  prd_price,
  prd_url,
  prd_id,
  onClickWish,
  user,
}) => {
  return (
    <Item key={prd_id}>
      <img src={`${prd_url}`} style={{ width: "100%" }} />
      <div className="title">
        <Link to={`/productionDetail/${prd_id}`}>
          <b>{prd_name}</b>
        </Link>
      </div>
      <div className="price">{prd_price}원</div>
      <button data-id={prd_id} onClick={onClickWish}>
        ❤
      </button>
    </Item>
  );
};

export default ProductionItem;
