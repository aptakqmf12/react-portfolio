const redux = require("redux");
const createStore = redux.createStore;
const reduxLogger = require("redux-logger");
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const combineReducers = redux.combineReducers;

// action

//reducer
const weightState = {
  weight: 101,
};

const weightReducer = (state = weightState, action) => {
  switch (action.type) {
    case "CLICK":
      return {
        ...state,
        weight: state.weight + 1,
      };
    default:
      return state;
  }
};

const viewState = {
  views: 9,
};

const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case "CLICK":
      return {
        ...state,
        weight: state.views + 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  view: viewReducer,
  weight: weightReducer,
});

let store = createStore(rootReducer);

console.log(store.getState());
