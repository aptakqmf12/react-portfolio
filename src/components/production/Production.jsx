import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import ProductionItem from "./ProductionItem";
import { setCurrentUser } from "../../redux/actions/authActions";
import ProductionSkeleton from "./ProductionSkeleton";
import axios from "axios";

const Production = ({ onlyWishedPrd }) => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const onClickWish = async (e) => {
    const targetPrdId = e.target.dataset.id; //상품필드의 ID
    if (item.reducer.isAuth) {
      if (item.reducer.userData.wished_prd_id?.includes(targetPrdId)) {
        //클릭한 id값이 데이터중에 있으면 추가하지말고 찜 삭제 -> 이부분 액션으로 변환
        const removeWishedPrd = async (targetPrdId) => {
          await updateDoc(
            doc(db, "user", localStorage.getItem("loginedUserId")),
            {
              wished_prd_id: arrayRemove(targetPrdId),
            }
          );
          dispatch(setCurrentUser(localStorage.getItem("loginedUserId")));
        };
        removeWishedPrd(targetPrdId);

        alert("찜삭제");
      } else {
        //클릭한 id값이 데이터중에 없으면 추가
        const addWishedPrd = async (targetPrdId) => {
          await updateDoc(
            doc(db, "user", localStorage.getItem("loginedUserId")),
            {
              wished_prd_id: arrayUnion(targetPrdId),
            }
          );
          dispatch(setCurrentUser(localStorage.getItem("loginedUserId")));
        };
        addWishedPrd(targetPrdId);

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
      {
        !onlyWishedPrd
          ? // 모든 데이터 출력
            item.reducer.productData?.map((e) => {
              return (
                <SwiperSlide
                  style={{ border: "1px #666 solid", overflow: "hidden" }}
                  key={e.prd_id}
                >
                  <ProductionItem
                    product={e}
                    wished_prd_id={item.reducer.userData.wished_prd_id}
                    onClickWish={onClickWish}
                  />
                </SwiperSlide>
              );
            })
          : // 찜한 데이터 출력 (전체상품 filter안에 찜한상품some으로하면될거같아요)

            item.reducer.productData?.map((e) => {
              return (
                <SwiperSlide
                  style={{ border: "1px #666 solid", overflow: "hidden" }}
                  key={e.prd_id}
                >
                  <ProductionItem
                    product={e}
                    wished_prd_id={item.reducer.userData.wished_prd_id}
                    onClickWish={onClickWish}
                  />
                </SwiperSlide>
              );
            })

        // const a =[{id:1,b:'aa'},{id:1,b:'ca'},{id:12,b:'aa'},{id:1,b:'ba'}]
        // a.reduce((a,c)=>{
        //   const b = a;
        // console.log(a,b,c)
        //    if(!b[c.id]) b[c.id] = new Array();
        //     b[c.id].push(c)
        //     return b
        // },{})
      }
    </Swiper>
  );
};

export default Production;
