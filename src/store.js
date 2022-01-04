import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const INITIAL_STATE = {
  name: "ktw",
  weight: 77,
  info: {
    flag: false,
    hobby: ["swimming", "dance", "singing"],
  },
  isAuthorized: localStorage.getItem("isAuthorized"),
};

// 이펙트 빌딩?
// export const ADD_WEIGHT = "ADD_WEIGHT";

// const addWeight = (init)=>(
//   {type:ADD_WEIGHT}
//   );

export const ADD_WEIGHT = "ADD_WEIGHT";
export const AUTH_TRUE = "AUTH_TRUE";
export const AUTH_FALSE = "AUTH_FALSE";

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_WEIGHT:
      return {
        ...state,
        weight: state.weight + 1,
      };

    case "AUTH_TRUE":
      return {
        ...state,
        isAuthorized: true,
      };
    case "AUTH_FALSE":
      return {
        ...state,
        isAuthorized: false,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, composeWithDevTools());
