const initialState = {
  fetching: false,
  data: {},
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_MOVIE":
      return { ...state, fetching: true, data: {}, error: null };
    case "SELECT_MOVIE_SUCCESS":
      return { ...state, fetching: false, data: action.payload, error: null };
    case "SELECT_MOVIE_FAILURE":
      return { ...state, fetching: false, data: {}, error: action.error };

    default:
      return state;
  }
};
export default reducer;
