import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productActions";
import ProductionComments from "../components/production/comments/Comments";
import Modal from "react-modal";
import CommentsCreate from "../components/production/comments/CommentsCreate";

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
    &--review {
      font-size: 1.2rem;

      &-star {
        color: red;
      }
      &-score {
        margin-left: 0.5rem;
        font-weight: bold;
      }
      &-num {
        margin-left: 0.5rem;
        color: #666;
      }
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
  nav {
    position: sticky;
    top: 0;
    width: 100%;
    border-bottom: 3px black solid;

    background-color: white;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        width: 100%;
        border-right: 2px #eee solid;
        &:first-child {
          border-left: 2px #eee solid;
        }
        a {
          display: block;
          width: 100%;
          padding: 1.5rem 0;
          text-align: center;
        }
      }
    }
  }
  .content {
    padding: 1rem;
    h2 {
      margin-bottom: 3rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px black solid;
    }
  }
  .prd__commentsWrap {
    &--btn {
      text-align: right;
      button {
        padding: 0.5rem;
        background-color: navy;
        font-size: 1.6rem;
        font-weight: bold;
        color: white;
      }
    }
  }
  .prd__info {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    min-height: 1000px;
  }

  .prd__qa {
    background-color: yellow;
    min-height: 1000px;
  }
`;

const ProductionDetail = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams(); //prdId
  const [currentPrd, setCurrentPrd] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const createComments = () => {
    if (!item.reducer.isAuth) alert("로그인 먼저 해주세요");
    else setIsOpen(true);
  };

  useEffect(() => {
    const currentProduct = item.reducer.productData.filter(
      (e) => e.prd_id === id
    );
    setCurrentPrd(currentProduct);
  }, []);

  return (
    <>
      <Wrap>
        <DetaileTop>
          <div className="prd__thumb">
            <img src={currentPrd[0]?.prd_url} />
          </div>
          <div className="prd__option">
            {/* 가격존 */}
            <div className="prd__option--name mb">
              {currentPrd[0]?.prd_name}
            </div>
            <div className="prd__option--price mb">
              {currentPrd[0]?.prd_price &&
                currentPrd[0]?.prd_price.toLocaleString("ko-KR")}
              원
            </div>
            <div className="prd__option--review mb">
              <span className="prd__option--review-star">★★★★☆</span>
              <span className="prd__option--review-score">4.0</span>/5
              <span className="prd__option--review-num">
                (
                {currentPrd[0]?.prd_comments
                  ? currentPrd[0]?.prd_comments.length
                  : 0}
                )
              </span>
            </div>
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
          <nav>
            <ul>
              <li>
                <a href="#prd__info">상품정보</a>
              </li>
              <li>
                <a href="#prd__commentsWrap">
                  상품리뷰
                  <span style={{ color: "red" }}>
                    (
                    {currentPrd[0]?.prd_comments
                      ? currentPrd[0]?.prd_comments.length
                      : 0}
                    )
                  </span>
                </a>
              </li>
              <li>
                <a href="#prd__qa">상품문의</a>
              </li>
            </ul>
          </nav>

          <div className="prd__info" id="prd__info">
            {currentPrd[0]?.prd_name} 상품의 정보
          </div>

          {/* 댓글 영역 */}
          <div id="prd__commentsWrap" className="content">
            <h2>상품리뷰</h2>
            {currentPrd[0]?.prd_comments?.map((comment) => {
              return <ProductionComments comment={comment} />;
            })}

            <div className="prd__commentsWrap--btn">
              <button onClick={createComments}>댓글작성하기</button>
            </div>
            <CommentsCreate isOpen={isOpen} setIsOpen={setIsOpen} prdId={id} />
          </div>

          <div className="prd__qa" id="prd__qa">
            상품문의
          </div>
        </DetaileBody>
      </Wrap>
    </>
  );
};

export default ProductionDetail;
