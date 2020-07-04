import Axios from "../baseURL";

export const searchMovieAPI = (payload) => {
  return Axios.get("", {
    params: {
      s: payload.searchText,
      ...(payload.searchType ? { type: payload.searchType } : {}),
    },
  });
};
