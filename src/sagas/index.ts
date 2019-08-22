import { SagaMiddleware } from "@redux-saga/core";
import helloSaga from "./hello-saga";

export default (middleware: SagaMiddleware) => {
  middleware.run(helloSaga);
};
