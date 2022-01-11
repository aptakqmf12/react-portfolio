import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";

const Wrap = styled.div`
  width: 100%;
`;

const DetaileTop = styled.div`
  display: flex;
  justify-content: space-between;

  //좌측 썸네일 영역
  .prd__thumb {
    width: 60%;
    border: 1px red solid;
    img {
      width: 100%;
    }
  }
  //우측 옵션영역
  .prd__option {
    width: 33%;
    padding: 1rem 1rem 0 1rem;
    border-left: 1px blue solid;

    //공통 아랫 여백
    .mb {
      margin-bottom: 1rem;
    }
    &--name {
      font-size: 1.8rem;
      font-weight: bold;
    }
    &--price {
      font-size: 1.2rem;
      font-weight: bold;
    }
    &--point {
      font-size: 1.2rem;
      color: #666;
    }
    &--btn {
      display: flex;
      justify-content: space-between;
      button {
        padding: 1rem 0;
      }
      &-wish {
        width: 40%;
        margin-right: 1rem;
        border: 1px black solid;
      }
      &-buy {
        width: 60%;
        background-color: red;
        border: 1px #888 solid;
        color: white;
      }
    }
    &--notice {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      border-top: 1px black solid;
      border-bottom: 1px black solid;
    }
    &--banner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 5rem;
      border: 1px black solid;
      background-color: #eee;
      color: white;
    }
  }
`;

const DetaileBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 1000px;
`;

const ProductionDetail = () => {
  const { id } = useParams(); //prdId
  const [prd, setPrd] = useState({});

  const getPrdData = async () => {
    const docRef = doc(db, "production", id);
    const docSnap = await getDoc(docRef);
    setPrd(docSnap.data());
  };

  useEffect(() => {
    getPrdData();
  }, []);

  return (
    <>
      <Wrap>
        <DetaileTop>
          <div className="prd__thumb">
            <div>
              <img src={prd.prd_url} />
            </div>
          </div>

          <div className="prd__option">
            {/* 가격존 */}
            <div className="prd__option--name mb">{prd.prd_name}</div>
            <div className="prd__option--price mb">
              {prd.prd_price && prd.prd_price.toLocaleString("ko-KR")}원
            </div>
            <div className="prd__option--point mb">9999999원</div>
            {/* 배너존 */}
            <div className="prd__option--notice mb">상품알림정보</div>
            <div className="prd__option--banner mb">배너01</div>
            <div className="prd__option--banner mb">배너02</div>
            {/* 구매버튼 */}
            <div className="prd__option--btn">
              <button className="prd__option--btn-wish">찜</button>
              <button className="prd__option--btn-buy">구매</button>
            </div>
          </div>
        </DetaileTop>

        <DetaileBody>
          <div className="">421414</div>
        </DetaileBody>
      </Wrap>
    </>
  );
};

export default ProductionDetail;