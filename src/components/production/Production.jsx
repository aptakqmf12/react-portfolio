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
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

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
  const [production, setProduction] = useState([]);
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getFireStoreData = async () => {
    const querySnapshot = await getDocs(collection(db, "production"));
    const shuffle = [];

    await querySnapshot.forEach((doc) => {
      shuffle.push(doc);
    });
    setProduction(shuffle);
  };

  const onClickWish = async (e) => {
    const targetId = e.target.dataset.id;
    const docRef = doc(db, "production", targetId);
    const docSnap = await getDoc(docRef);

    if (item.isAuth) {
      await updateDoc(doc(db, "production", targetId), {
        //targetId의 문서의 현재 wished값을 토글
        wished: !docSnap.data().wished,
      });
      docSnap.data().wished === true
        ? alert("찜하기 취소")
        : alert("찜하셨습니다");
    } else {
      alert("로그인하세요");
      navigate("/login");
    }

    getFireStoreData(); //데이터 받아와서 현행화
  };

  useEffect(() => {
    getFireStoreData();
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        // navigation
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {production && !onlyWishedPrd
          ? production.map((e, id) => {
              return (
                <>
                  <SwiperSlide
                    style={{ border: "1px #666 solid", overflow: "hidden" }}
                    key={id}
                  >
                    <Item>
                      <img
                        src={`${e.data().prd_url}`}
                        style={{ width: "100%" }}
                      />
                      <div className="title">
                        <Link to={`/productionDetail/${e.id}`}>
                          <b>{e.data().prd_name}</b>
                        </Link>
                      </div>
                      <div className="price">{e.data().prd_price}원</div>
                      <button
                        data-id={e.id}
                        data-wished={e.data().wished}
                        onClick={onClickWish}
                        style={
                          e.data().wished
                            ? { color: "red" }
                            : { color: "black" }
                        }
                      >
                        ❤
                      </button>
                    </Item>
                  </SwiperSlide>
                </>
              );
            })
          : production
              .filter((e) => e.data().wished === true)
              .map((e, id) => {
                return (
                  <>
                    <SwiperSlide
                      style={{ border: "1px #666 solid", overflow: "hidden" }}
                      key={id}
                    >
                      <Item>
                        <img
                          src={`${e.data().prd_url}`}
                          style={{ width: "100%" }}
                        />

                        <div className="title">
                          <Link to={`/productionDetail/${e.id}`}>
                            <b>{e.data().prd_name}</b>
                          </Link>
                        </div>

                        <div className="price">{e.data().prd_price}원</div>
                        <button
                          data-id={e.id}
                          data-wished={e.data().wished}
                          onClick={onClickWish}
                          style={
                            e.data().wished
                              ? { color: "red" }
                              : { color: "black" }
                          }
                        >
                          ❤
                        </button>
                      </Item>
                    </SwiperSlide>
                  </>
                );
              })}

        {/* 찜한 상품만 select */}
      </Swiper>
    </>
  );
};

export default Production;
