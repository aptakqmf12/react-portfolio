import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getProducts = () => async (dispatch) => {
  const res = await getDocs(collection(db, "production"));
  const mergedData = [];
  res.docs.map((e) => {
    mergedData.push(e.data());
  });
  dispatch({ type: fetchActionTypes.FETCH_PRODUCTS, payload: mergedData });
};
