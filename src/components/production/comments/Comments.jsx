import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions/productActions";

const Comments = styled.div`
  margin-bottom: 1rem;
  .prd__comments {
    // 작성자 정보
    &--user {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &-thumb {
        width: 3rem;
        height: 3rem;
        border: 1px #eee solid;
        border-radius: 50%;
        background-color: red;
        overflow: hidden;
      }
      &-name {
        margin-left: 0.5rem;
        font-size: 1.6rem;
        font-weight: bold;
      }
      &-date {
        margin-left: 0.5rem;
        font-weight: bold;
        font-size: 1.1rem;
        color: #666;
        letter-spacing: -0.05rem;
      }
      &-time {
        margin-left: 0.25rem;
        font-size: 1.1rem;
        color: #888;
        letter-spacing: -0.05rem;
      }
    }
    // 댓글 영역
    &--text {
    }
  }
`;

const ProductionComments = ({ comment }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [comment]);

  return (
    <Comments className="prd__comments">
      <div className="prd__comments--user">
        <img src alt="thumb" className="prd__comments--user-thumb" />
        <span className="prd__comments--user-name">{comment.userName}</span>
        <span className="prd__comments--user-date">
          {comment.year}-{comment.month}-{comment.date}{" "}
        </span>
        <span className="prd__comments--user-time">
          {comment.hour}:{comment.minute}
        </span>
      </div>
      <div className="prd__comments--text">{comment.comment}</div>
    </Comments>
  );
};

export default ProductionComments;

// prd_commtents [
//     { userId:Stirng, comment:Stirng, created:Date, reply: [ {userId:Stirng, reply:Stirng, created:Date},{userId:Stirng, reply:Stirng, created:Date} ] },
//     { userId:Stirng, comment:Stirng, created:Date, reply: [ {userId:Stirng, reply:Stirng, created:Date},{userId:Stirng, reply:Stirng, created:Date} ] },
//     { userId:Stirng, comment:Stirng, created:Date, reply: [ {userId:Stirng, reply:Stirng, created:Date},{userId:Stirng, reply:Stirng, created:Date} ] },
//     ...
// ]
