import { all } from "redux-saga/effects";

import search from "./search/saga";
import movie from "./movie/saga";

export default function* rootSaga() {
  yield all([search(), movie()]);
}
