import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Item = styled.div`
  position: relative;
  overflow: hidden;
  img {
    margin-bottom: 1rem;
    transition: 0.2s all ease-out;
    &:hover {
      transform: scale(1.05);
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

const Production = () => {
  const [production, setProduction] = useState("");
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  const getData = async () => {
    const res = await axios.get("http://localhost:3005/api/notice/list");
    setProduction(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickWished = (e) => {
    e.target.classList.toggle("red");
  };

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
        {production &&
          production.map((e, id) => {
            return (
              <>
                <SwiperSlide style={{ border: "1px #666 solid" }} key={id}>
                  <Item>
                    <img src={`${e.URL}`} style={{ width: "100%" }} />

                    <div className="title">
                      <b>{e.SUBJECT}</b>
                    </div>

                    <div className="price">{e.CONTENT}원</div>
                    <button
                      data-id={id}
                      onClick={(e) => {
                        e.target.classList.toggle("red");
                        axios.post("http://localhost:3005/api/notice/update", {
                          id: e.target.dataset.id,
                          subject: "hi",
                          content: "hellow",
                          WISHED: 1,
                        });
                      }}
                    >
                      ❤
                    </button>
                  </Item>
                </SwiperSlide>
              </>
            );
          })}
      </Swiper>
    </>
  );
};

export default Production;
