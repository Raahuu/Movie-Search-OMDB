import { takeLatest, call, put } from "redux-saga/effects";

import { selectMovieAPI } from "./API";

const formatAPIResponse = (apiResponse) => {
  let formattedOutput = {
    plot: apiResponse.Plot,
    poster: apiResponse.Poster,
    title: apiResponse.Title,
    year: apiResponse.Year,
    imdbID: apiResponse.imdbID,
  };

  return formattedOutput;
};

function* selectMovie(action) {
  try {
    const response = yield call(selectMovieAPI, action.payload.id);
    if (response && response.data) {
      yield put({
        type: "SELECT_MOVIE_SUCCESS",
        payload: formatAPIResponse(response.data),
      });

      action.payload.history.push(
        `/movie/${response.data.imdbID}/${response.data.Title}`
      );
    }
  } catch (err) {
    yield put({
      type: "SELECT_MOVIE_FAILURE",
    });
  }
}

export default function* defaultSaga() {
  yield takeLatest("SELECT_MOVIE", selectMovie);
}
