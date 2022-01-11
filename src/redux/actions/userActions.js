import { ActionTypes } from "../actionTypes/fetchActionTypes";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// Actions
export const getUser = (useId) => async (dispatch) => {
  const res = await getDoc(doc(db, "user", useId));
  dispatch({ type: ActionTypes.FETCH_USER, payload: res.data });
};

export const getWholeUser = () => async (dispatch) => {
  const res = await getDocs(collection(db, "user"));
  const mergedData = [];
  await res.docs.map((e) => {
    mergedData.push(e.data());
  });
  dispatch({ type: ActionTypes.FETCH_WHOLE_USER, payload: mergedData });
};
