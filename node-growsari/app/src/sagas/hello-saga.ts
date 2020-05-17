import { call, put, takeLatest } from "redux-saga/effects";
import { SAY_HELLO } from "../constant";

function* hello({ payload }: any) {
  try {
    yield put({ type: "SAMPLE", payload: "" });
  } catch (e) {
    console.log(e);
    yield put({ type: "SAMPLE", payload: "" });
  }
}

export default function* helloSaga() {
  yield takeLatest(SAY_HELLO, hello);
}
