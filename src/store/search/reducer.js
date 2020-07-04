const initialState = {
  fetching: false,
  data: [],
  itemCount: 0,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_FOR_MOVIE":
      return { fetching: true, data: [], itemCount: 0, error: null };
    case "SEARCH_FOR_MOVIE_SUCCESS":
      return {
        ...state,
        fetching: false,
        data: action.payload,
        itemCount: action.count,
      };
    case "SEARCH_FOR_MOVIE_FAILURE":
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
};
export default reducer;
