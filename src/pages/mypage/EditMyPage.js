import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../firebase";
import { modifyrofile } from "../../redux/actions/userActions";
import DefaultProfile from "/public/images/default_profile.png";
import {
  uploadBytes,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";

const Profile = styled.div`
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
  border: 1px #e3e3e3 solid;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
const FileBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 1.5rem;
    padding: 1rem;
    border: 1px black solid;
    font-size: 1.2rem;
    cursor: pointer;
    box-sizing: border-box;
    font-family: "GmarketSansMedium";
  }

  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  input[type="text"] {
    & + label {
      background-color: darkblue;
      color: white;
    }
  }
  button {
    background-color: red;
    color: white;
  }
`;

const EditMyPage = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();
  // input에서 선택된 이미지 파일
  const [fileName, setFileName] = useState("");
  // 서버에 프로필이 있는경우 프로필 상태값
  const [currentProfile, setCurrentProfile] = useState(
    item.reducer.userData.thumb
  );
  // 서버에 프로필이 없는경우 프로필 상태값
  const [defaultProfile, setDefaultProfile] = useState(DefaultProfile);
  const [progress, setProgress] = useState(0);

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDefaultProfile(reader.result);
      setCurrentProfile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/images/${item.reducer.userData.userId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          dispatch(modifyrofile(url, item.reducer.userData.userId))
        );
      }
    );
  };
  const onSubmitProfile = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  return (
    <>
      <Profile>
        {item.reducer.userData?.thumb ? (
          <img src={item.reducer.userData.thumb} alt="프로필이미지" />
        ) : (
          <img src={defaultProfile} alt="기본이미지" />
        )}
      </Profile>
      <h2>progress : {progress}%</h2>

      <form onSubmit={onSubmitProfile}>
        <legend>프로필이미지</legend>
        <FileBox>
          <input
            type="file"
            id="FileInput"
            onChange={onChange}
            accept="image/*"
          />
          <input type="text" disabled value={fileName} />
          <label htmlFor="FileInput" className="btn">
            이미지추가
          </label>
          <button type="submit">click</button>
        </FileBox>
      </form>
    </>
  );
};

export default EditMyPage;
