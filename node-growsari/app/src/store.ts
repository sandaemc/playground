import { createStore, applyMiddleware } from "redux";
import reducers from "./reducer";
import createSagaMiddleware from "@redux-saga/core";
import initSagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const configure = () => {
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  initSagas(sagaMiddleware);

  return store;
};
