import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getProducts = () => async (dispatch) => {
  const res = await getDocs(collection(db, "production"));
  const mergedData = [];
  res.docs.map((e) => {
    mergedData.push(e.data());
  });
  console.log("성공적으로 상품데이터를 받아왔습니다", mergedData);
  dispatch({ type: fetchActionTypes.FETCH_PRODUCTS, payload: mergedData });
};
