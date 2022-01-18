import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import {
  updateDoc,
  doc,
  collection,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions/productActions";

const ReplyInput = styled.div`
  form {
    textarea {
      width: 100%;
      height: 300px;
      box-sizing: border-box;
      padding: 1rem;
      resize: none;
      &:focus {
        outline: none;
      }
    }
  }
`;

const ReplyCreate = ({ isOpen, setIsOpen, prdId }) => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const onCancelInput = () => {
    setIsOpen(false);
  };
  const onAddComments = async () => {
    if (!item.reducer.isAuth) {
      alert("로그인 먼저 해주세요");
    } else {
      // 댓글등록로직
      await updateDoc(doc(db, "production", prdId), {
        prd_comments: arrayUnion({
          userId: item.reducer.userData.userId,
          userName: item.reducer.userData.name,
          comment: comment,
          year: new Date().getFullYear(),
          month:
            new Date().getMonth() < 9
              ? `0${new Date().getMonth() + 1}`
              : new Date().getMonth(),
          date:
            new Date().getDate() < 10
              ? `0${new Date().getDate()}`
              : new Date().getDate(),
          hour:
            new Date().getHours() < 10
              ? `0${new Date().getHours()}`
              : new Date().getHours(),
          minute:
            new Date().getMinutes() < 10
              ? `0${new Date().getMinutes()}`
              : new Date().getMinutes(),
          active: "create",
          reply: [],
        }),
      });
      // 상품정보를받아와서 데이터갱신 (redux에는 갱신되는데, 화면에 안그려짐)
      dispatch(getProducts());
    }
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
    >
      <ReplyInput>
        <form>
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="대댓글을 입력해주세여"
          ></textarea>
        </form>

        <div className="btns">
          <button onClick={onCancelInput}>취소</button>
          <button onClick={onAddComments}>등록</button>
        </div>
      </ReplyInput>
    </Modal>
  );
};

export default ReplyCreate;
