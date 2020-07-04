const initialState = {
  fetching: false,
  data: {
    allCards: {},
    cardsToShow: [],
  },
  itemCount: 0,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_FOR_MOVIE":
      return {
        fetching: true,
        data: {
          allCards: {},
          cardsToShow: [],
        },
        itemCount: 0,
        error: null,
      };
    case "SEARCH_FOR_MOVIE_SUCCESS":
      return {
        ...state,
        fetching: false,
        data: action.payload,
        itemCount: action.count,
      };
    case "SEARCH_FOR_MOVIE_FAILURE":
      return { ...state, fetching: false, error: action.error };

    case "PAGINATION_TRIGGER":
      return { ...state, fetching: true };

    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: action.pageNumber };

    case "RESET":
      return {
        fetching: false,
        data: {
          allCards: {},
          cardsToShow: [],
        },
        itemCount: 0,
        activePage: 1,
        error: null,
      };

    default:
      return state;
  }
};
export default reducer;
