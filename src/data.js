import {
  doc,
  collection,
  setDoc, //상품을 추가할일있을때 사용
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

//콜렉션네임을 받아서 "모든"데이터를 가져온뒤 상태값에 추가
export const getFireStoreDataAll = async (collectionName, setState) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = [];
  await querySnapshot.forEach((doc) => {
    data.push(doc);
  });
  setState(data);
};

export const getFireStoreData = async (collectionName, id, setState) => {
  const singleData = await getDoc(doc(db, collectionName, id));
  setState(singleData);
};
