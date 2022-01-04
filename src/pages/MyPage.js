import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Production from "../components/Production";

import ProfileImg from "/public/images/ktw.jpg";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left_Section = styled.div`
  width: 20%;
  height: 100%;
  position: sticky;
  top: 0;
  .profile {
    position: relative;
    margin-bottom: 2rem;
    text-align: center;
    img {
      width: 10rem;
      height: 10rem;
      border: 2px #eee solid;
      border-radius: 50%;
    }
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      border: 0;
      overflow: hidden;
    }
  }
  .btn {
    button {
      width: 100%;
      margin-bottom: 2rem;
      padding: 1rem 0;
      border-radius: 20px;
      background-color: #27314c;
      color: white;
      font-size: 1.4rem;
      &:hover {
        background-color: #161b2a;
      }
    }
  }
  ul.info {
    h3 {
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px #27314c solid;
      color: #27314c;
      font-weight: bold;
    }
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const Right_Section = styled.div`
  width: calc(80% - 5rem);
  margin-left: 5rem;
  padding: 1rem;
  border: 1px #eee solid;
  h2 {
    margin-bottom: 2rem;
  }
`;

const MyPage = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <Wrap>
        <Left_Section>
          <div className="profile">
            <img src={ProfileImg} alt="profile_thumb" />
            <input type="file" /> {/* 추후에 구현 */}
            <div>{item.name}</div>
          </div>
          <div className="btn">
            <button>클릭</button>
          </div>
          <ul className="info">
            <h3>Mypage</h3>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
          </ul>
        </Left_Section>

        <Right_Section>
          <h2>찜한 상품</h2>
          <Production />

          <h2>찜한 상품</h2>
          <Production />

          <h2>찜한 상품</h2>
          <Production />
        </Right_Section>
      </Wrap>
    </>
  );
};

export default MyPage;
