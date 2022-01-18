import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ProductionSkeleton from "./ProductionSkeleton";

const Item = styled.div`
  position: relative;
  padding: 0.5rem;
  img {
    margin-bottom: 1rem;
    transition: 0.2s all ease-out;
    &:hover {
      transform: scale(1.03);
    }
  }
  .review {
    text-align: right;
    font-size: 1.2rem;
    color: Red;
    letter-spacing: 0.1rem;
  }
  .title {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  .price {
    font-size: 1.3rem;
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

const ProductionItem = ({ product, wished_prd_id, onClickWish }) => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <Item key={product.prd_id}>
        <img src={`${product.prd_url}`} style={{ width: "100%" }} />
        <div className="review">
          ({product.prd_comments ? product.prd_comments.length : 0})
        </div>
        <div className="title">
          <Link to={`/productionDetail/${product.prd_id}`}>
            <b>{product.prd_name}</b>
          </Link>
        </div>
        <div className="price">
          {product.prd_price.toLocaleString("ko-KR")}원
        </div>

        {item.reducer.isAuth ? (
          wished_prd_id?.includes(product.prd_id) ? (
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
