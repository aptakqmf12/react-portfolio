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
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getUser } from "../../redux/actions/userActions";
import {
  getProducts,
  addWishedProduct,
  removeWishedProduct,
} from "../../redux/actions/productActions";
import ProductionItem from "./ProductionItem";
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

const Production = ({ onlyWishedPrd }) => {
  const item = useSelector((state) => state);
  let navigate = useNavigate();

  const onClickWish = async (e) => {
    const targetPrdId = e.target.dataset.id; //상품필드의 ID
    if (item.isAuth) {
      if (item.userData.wished_prd_id?.includes(targetPrdId)) {
        //클릭한 id값이 데이터중에 있으면 추가하지말고 삭제
        updateDoc(doc(db, "user", localStorage.getItem("loginedUserId")), {
          wished_prd_id: arrayRemove(targetPrdId),
        });

        // store에 삭제된 내용(targetPrdId)을 반영

        alert("찜삭제");
      } else {
        //클릭한 id값이 데이터중에 없으면 추가
        updateDoc(doc(db, "user", localStorage.getItem("loginedUserId")), {
          wished_prd_id: arrayUnion(targetPrdId),
        });

        // store에 추가된 내용(targetPrdId)을 반영
        dispatch;

        alert("찜완료");
      }
    } else {
      alert("로그인 먼저 해주세요");
      navigate("/login");
    }
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={4}
    >
      {!onlyWishedPrd
        ? // 모든 데이터 출력
          item.productData?.map((e) => {
            return (
              <SwiperSlide
                style={{ border: "1px #666 solid", overflow: "hidden" }}
                key={e.prd_id}
              >
                <ProductionItem
                  product={e}
                  wished_prd_id={item.userData.wished_prd_id}
                  onClickWish={onClickWish}
                />
              </SwiperSlide>
            );
          })
        : // 찜한 데이터 출력 (전체상품 filter안에 찜한상품some으로하면될거같아요)

          // item.productData?.map((e) => {
          //   return (
          //     <SwiperSlide
          //       style={{ border: "1px #666 solid", overflow: "hidden" }}
          //       key={e.prd_id}
          //     >
          //       <ProductionItem
          //         product={e}
          //         wished_prd_id={item.userData.wished_prd_id}
          //         onClickWish={onClickWish}
          //       />
          //     </SwiperSlide>
          //   );
          // })

          // const a =[{id:1,b:'aa'},{id:1,b:'ca'},{id:12,b:'aa'},{id:1,b:'ba'}]
          // a.reduce((a,c)=>{
          //   const b = a;
          // console.log(a,b,c)
          //    if(!b[c.id]) b[c.id] = new Array();
          //     b[c.id].push(c)
          //     return b
          // },{})

          console.log(
            item.productData?.filter((product) => {
              item.userData.wished_prd_id.some((id) => id === product.prd_id);
            })
          )}
    </Swiper>
  );
};

export default Production;
