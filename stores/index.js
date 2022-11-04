import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  whitelist: [""],
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);
let persistor = persistStore(store);

const exportedObject = { store, persistor };

export default exportedObject;
