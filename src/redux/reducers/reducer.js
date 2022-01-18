import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import { AUTH_TRUE, AUTH_FALSE } from "../actions/authActions";

const INITIAL_STATE = {
  weight: 77,
  isAuth: localStorage.getItem("loginedUserId") ? true : false,
  allUserData: [],
  userData: {}, //현재 로그인된 유저데이터
  productData: [],
  comments: [
    {
      id: 1,
      text: "default text",
      created: new Date(),
      modified: new Date(),
    },
  ],
};

// Reducer
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // 로그인시
    case AUTH_TRUE:
      return { ...state, isAuth: true };
    case fetchActionTypes.SET_CURRENT_USER:
      return { ...state, userData: action.payload };

    // 로그아웃시
    case AUTH_FALSE:
      return { ...state, isAuth: false };
    case fetchActionTypes.CLEAR_CURRENT_USER:
      return { ...state, userData: action.payload };

    case fetchActionTypes.FETCH_WHOLE_USER:
      return { ...state, allUserData: action.payload };

    // productData
    case fetchActionTypes.FETCH_PRODUCTS:
      return { ...state, productData: action.payload };

    case fetchActionTypes.ADD_COMMENTS:
      return { ...state, productData: action.payload };

    // 프로필사진 수정시
    case fetchActionTypes.MODIFY_PROFILE:
      return { ...state, userData: { thumb: action.payload } };

    default:
      return state;
  }
};
