import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { db } from "../../firebase";
import {
  doc,
  collection,
  setDoc, //상품을 추가할일있을때 사용
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getFireStoreDataAll, getFireStoreData } from "../../data";
import ProductionItem from "./ProductionItem";

import useProduct from "../../hooks/useProduct";
import useUser from "../../hooks/useUser";

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
const wishedPrds = [];

const Production = ({ onlyWishedPrd }) => {
  const [production, setProduction] = useProduct();
  const [user, setUser] = useUser();

  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onClickWish = async (e) => {
    const targetPrdId = e.target.dataset.id; //상품필드의 ID
    wishedPrds.push(targetPrdId);
    //중첩 id 삭제
    const unduplicatedPrds = wishedPrds.filter((e, i) => {
      return wishedPrds.indexOf(e) === i;
    });
    updateDoc(doc(db, "user", localStorage.getItem("loginedUserId")), {
      wished_prd_id: unduplicatedPrds,
    });
    alert("찜완료");
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
      >
        {!onlyWishedPrd
          ? production?.map(({ prd_name, prd_price, prd_url, id }) => {
              return (
                <SwiperSlide
                  style={{ border: "1px #666 solid", overflow: "hidden" }}
                  key={id}
                >
                  <ProductionItem
                    prd_name={prd_name}
                    prd_price={prd_price}
                    prd_url={prd_url}
                    prd_id={id}
                    onClickWish={onClickWish}
                    user={user}
                  />

                  <Item>
                    <img src={`${prd_url}`} style={{ width: "100%" }} />
                    <div className="title">
                      <Link to={`/productionDetail/${id}`}>
                        <b>{prd_name}</b>
                      </Link>
                    </div>
                    <div className="price">{prd_price}원</div>
                    <button data-id={id} onClick={onClickWish}>
                      ❤
                    </button>
                  </Item>
                </SwiperSlide>
              );
            })
          : production
              ?.filter((e) => e.wished === true)
              ?.map((e, id) => {
                return (
                  <SwiperSlide
                    style={{ border: "1px #666 solid", overflow: "hidden" }}
                    key={e.id}
                  >
                    <Item>
                      <img src={`${e.prd_url}`} style={{ width: "100%" }} />

                      <div className="title">
                        <Link to={`/productionDetail/${e.id}`}>
                          <b>{e.prd_name}</b>
                        </Link>
                      </div>

                      <div className="price">{e.prd_price}원</div>
                      <button
                        data-id={e.id}
                        data-wished={e.wished}
                        onClick={onClickWish}
                        style={e.wished ? { color: "red" } : { color: "black" }}
                      >
                        ❤
                      </button>
                    </Item>
                  </SwiperSlide>
                );
              })}

        {/* 찜한 상품만 select */}
      </Swiper>
    </>
  );
};

export default Production;
