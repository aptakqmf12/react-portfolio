import { fetchActionTypes } from "../actionTypes/fetchActionTypes";
import { AUTH_TRUE, AUTH_FALSE } from "../actions/authActions";

const INITIAL_STATE = {
  weight: 77,
  isAuth: localStorage.getItem("loginedUserId") ? true : false,
  allUserData: [],
  userData: {},
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
    case AUTH_TRUE:
      return {
        ...state,
        isAuth: true,
      };
    case AUTH_FALSE:
      return {
        ...state,
        isAuth: false,
      };
    case fetchActionTypes.FETCH_WHOLE_USER:
      return { ...state, allUserData: action.payload };
    case fetchActionTypes.FETCH_USER:
      return { ...state, userData: action.payload };
    case fetchActionTypes.FETCH_PRODUCTS:
      return { ...state, productData: action.payload };

    default:
      return state;
  }
};
