import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducers/index";

const persistConfig = {
  key: "root",
  storage,
};

const persisted = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persisted,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
