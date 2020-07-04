import Axios from "../baseURL";

export const selectMovieAPI = (id) => {
  return Axios.get("", {
    params: {
      i: id,
      plot: "full",
    },
  });
};
