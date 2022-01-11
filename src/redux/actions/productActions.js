import { ActionTypes } from "../actionTypes/fetchActionTypes";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getProducts = async () => (dispatch) => {
  const res = await getDocs(collection(db, "product"));
  console.log(res.data());
  dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: res });
};
