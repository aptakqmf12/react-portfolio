import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const getProducts = () => async (dispatch) => {
  const res = await getDocs(collection(db, "production"));
  const mergedData = [];
  res.docs.map((e) => {
    mergedData.push(e.data());
  });
  dispatch({ type: fetchActionTypes.FETCH_PRODUCTS, payload: mergedData });
};

// export const removeWishedProduct = (targetPrdId) => (dispatch) => {
//   //서버에 찜 삭제 정보를 보낸뒤
//   await updateDoc(
//     doc(db, "user", localStorage.getItem("loginedUserId")),
//     {
//       wished_prd_id: arrayRemove(targetPrdId),
//     }
//   );

//   //userData에 변경값 저장
//   dispatch({ type: fetchActionTypes.REMOVE_WISHED_PRODUCT, payload: "data" });
// };
