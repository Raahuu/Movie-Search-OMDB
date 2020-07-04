import { combineReducers } from "redux";

import search from "./search";
import movie from "./movie";

export default combineReducers({
  SearchResults: search.reducer,
  Movie: movie.reducer,
});
