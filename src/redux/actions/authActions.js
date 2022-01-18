import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
// Actions

// 로그인시, 현재유저를 업데이트할때(찜하기)
export const AUTH_TRUE = "AUTH_TRUE";
export const setCurrentUser = (userId) => async (dispatch) => {
  //토큰이 없는채로 로그인 시도하면 차단
  if (!userId) return;
  const currentUser = await getDoc(doc(db, "user", userId));
  dispatch({
    type: fetchActionTypes.SET_CURRENT_USER,
    payload: currentUser.data(),
  });
};

// 로그아웃시
export const clearCurrentUser = () => (dispatch) => {
  dispatch({ type: fetchActionTypes.CLEAR_CURRENT_USER, payload: {} });
};
export const AUTH_FALSE = "AUTH_FALSE";
