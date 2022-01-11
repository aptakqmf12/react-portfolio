import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ProductionSkeleton from "./ProductionSkeleton";

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

const ProductionItem = ({ product, wished_prd_ld, onClickWish }) => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      {/* ['jvfC6gRXOBS3cJWaXcLd', 'S6WxJrSpQ1kSQmJqsE1h', '7i5qzZXrhqdXB9eVoJPs'] */}
      {console.log(wished_prd_ld)}
      <Item key={product.prd_id}>
        <img src={`${product.prd_url}`} style={{ width: "100%" }} />
        <div className="title">
          <Link to={`/productionDetail/${product.prd_id}`}>
            <b>{product.prd_name}</b>
          </Link>
        </div>
        <div className="price">{product.prd_price}원</div>
        <div>{product.prd_id}</div>

        {item.isAuth ? (
          wished_prd_ld?.includes(product.prd_id) ? (
            <button
              data-id={product.prd_id}
              onClick={onClickWish}
              style={{ color: "red" }}
            >
              ❤
            </button>
          ) : (
            <button data-id={product.prd_id} onClick={onClickWish}>
              ❤
            </button>
          )
        ) : (
          <button data-id={product.prd_id} onClick={onClickWish}>
            ❤
          </button>
        )}
      </Item>
    </>
  );
};

export default ProductionItem;
