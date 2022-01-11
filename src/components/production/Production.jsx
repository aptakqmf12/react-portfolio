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
import { getUser } from "../../redux/actions/userActions";
import { getProducts } from "../../redux/actions/productActions";
import ProductionItem from "./ProductionItem";

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
  // const [production, setProduction] = useProduct();
  const [production, setProduction] = useState();

  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUser(localStorage.getItem("loginedUserId")));
  }, []);

  const onClickWish = async (e) => {
    const targetPrdId = e.target.dataset.id; //상품필드의 ID
    wishedPrds.push(targetPrdId);
    //중첩 id 삭제
    const unduplicatedPrds = wishedPrds.filter((e, i) => {
      return wishedPrds.indexOf(e) === i;
    });
    // if (item.userData.wished_prd_id.includes(targetPrdId)) {
    //   //클릭한 id값이 데이터중에 없으면 추가
    //   console.log("기존에 있음 삭제 ㄱ");
    // } else {
    //   //클릭한 id값이 데이터중에 있으면 추가하지말고 삭제
    //   console.log("추가가능함");
    // }
    updateDoc(doc(db, "user", localStorage.getItem("loginedUserId")), {
      wished_prd_id: unduplicatedPrds,
    });
    e.target.style.color = "red";
    alert("찜완료");
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={4}
    >
      {!onlyWishedPrd
        ? item.productData?.map((e) => {
            return (
              <SwiperSlide
                style={{ border: "1px #666 solid", overflow: "hidden" }}
                key={e.prd_id}
              >
                <ProductionItem product={e} onClickWish={onClickWish} />
              </SwiperSlide>
            );
          })
        : item.productData
            ?.filter((e) => e.wished_prd_id === true)
            ?.map((e) => {
              return (
                <SwiperSlide
                  style={{ border: "1px #666 solid", overflow: "hidden" }}
                  key={e.prd_id}
                >
                  <ProductionItem onClickWish={onClickWish} />
                </SwiperSlide>
              );
            })}

      {/* 찜한 상품만 select */}
    </Swiper>
  );
};

export default Production;
