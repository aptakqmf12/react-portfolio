import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

// Actions
export const getWholeUser = () => async (dispatch) => {
  const res = await getDocs(collection(db, "user"));
  const mergedData = [];
  res.docs?.map((e) => {
    mergedData.push(e.data());
  });
  dispatch({ type: fetchActionTypes.FETCH_WHOLE_USER, payload: mergedData });
};

export const modifyrofile = (url, userId) => async (dispatch) => {
  // 이미지 url과 현재 userId를 받아서 useData에 해당되는 유저에 thumb필드 추가
  await updateDoc(doc(db, "user", userId), {
    thumb: url,
  });
  dispatch({ type: fetchActionTypes.MODIFY_PROFILE, payload: url });
};
