import { takeLatest, call, put } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import store from "../index";

import { searchMovieAPI } from "./API";

function* paginate(action) {
  const { pageNumber } = action.payload;
  const {
    data: { allCards },
    itemCount,
  } = store.getState().SearchResults;
  try {
    // Existing Page Number
    if (Object.keys(allCards).includes(pageNumber.toString())) {
      yield put({
        type: "SEARCH_FOR_MOVIE_SUCCESS",
        payload: {
          allCards: allCards,
          cardsToShow: allCards[pageNumber],
        },
        count: itemCount,
      });
    }
    // New Page Number
    else {
      const response = yield call(searchMovieAPI, action.payload);

      if (response && response.data && response.data.Response === "True") {
        yield put({
          type: "SEARCH_FOR_MOVIE_SUCCESS",
          payload: {
            allCards: {
              ...allCards,
              [pageNumber]: response.data && response.data.Search,
            },
            cardsToShow: response.data && response.data.Search,
          },
          count: response.data && response.data.totalResults,
        });
      } else {
        yield put({
          type: "SEARCH_FOR_MOVIE_FAILURE",
          error: response.data && response.data.Error,
        });
        NotificationManager.error(
          response.data && response.data.Error,
          "Error"
        );
      }
    }
  } catch (err) {
    throw err;
  }
}

function* searchForMovie(action) {
  try {
    const response = yield call(searchMovieAPI, action.payload);

    if (response && response.data && response.data.Response === "True") {
      yield put({
        type: "SEARCH_FOR_MOVIE_SUCCESS",
        payload: {
          allCards: { 1: response.data && response.data.Search },
          cardsToShow: response.data && response.data.Search,
        },
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
  yield takeLatest("PAGINATION_TRIGGER", paginate);
}
