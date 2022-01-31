import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Production from "../../components/production/Production";
import DefaultProfile from "/public/images/default_profile.png";

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
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 2rem;
      padding: 0.75rem 0;
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
  return (
    <>
      <Wrap>
        <Left_Section>
          <div className="profile">
            {item.reducer.userData?.thumb ? (
              <img src={item.reducer.userData.thumb} alt="profile_thumb" />
            ) : (
              <img src={DefaultProfile} alt="default_profile" />
            )}
            <div>{item.reducer.userData.name}님</div>
          </div>
          <div className="btn">
            <Link to="/EditMyPage">프로필 수정</Link>
          </div>
          <ul className="info">
            <h3>Mypage</h3>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </Left_Section>

        <Right_Section>
          <h2>찜한 상품</h2>

          <Production onlyWishedPrd />
        </Right_Section>
      </Wrap>
    </>
  );
};

export default MyPage;
