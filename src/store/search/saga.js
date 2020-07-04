import { takeLatest, call, put } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";

import { searchMovieAPI } from "./API";

function* searchForMovie(action) {
  try {
    const response = yield call(searchMovieAPI, action.payload);

    if (response && response.data && response.data.Response === "True") {
      yield put({
        type: "SEARCH_FOR_MOVIE_SUCCESS",
        payload: response.data && response.data.Search,
        count: response.data && response.data.totalResults,
      });
    } else {
      yield put({
        type: "SEARCH_FOR_MOVIE_FAILURE",
        error: response.data && response.data.Error,
      });
      NotificationManager.error(response.data && response.data.Error, "Error");
    }
  } catch (err) {
    throw err;
  }
}

export default function* defaultSaga() {
  yield takeLatest("SEARCH_FOR_MOVIE", searchForMovie);
}
