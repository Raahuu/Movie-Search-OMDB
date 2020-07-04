import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import CardDisplay from "../CardDisplay";

import styles from "./style.module.css";

const SearchSection = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const cardData = useSelector((state) => state.SearchResults.data);
  const loading = useSelector((state) => state.SearchResults.fetching);

  const handleChange = (event, title) => {
    switch (title) {
      case "searchText":
        setSearchText(event.target.value);
        break;

      case "searchType":
        setSearchType(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (searchText) {
      dispatch({
        type: "SEARCH_FOR_MOVIE",
        payload: {
          searchText,
          searchType,
        },
      });
    }
  };

  return (
    <div className={`${styles.flexColumn}`}>
      <p className={styles.title}>
        OMDB <b>Movies</b>
      </p>
      <div className={`${styles.form_holder} ${styles.flex}`}>
        {/* Movie name search bar */}
        <input
          className={`${styles.search_box} ${styles.neumophic} ${styles.input_box}`}
          placeholder="Enter a Movie Name"
          value={searchText}
          onChange={(event) => handleChange(event, "searchText")}
          onKeyDown={(event) => handleKeyDown(event)}
        />

        {/* Type Selector */}
        <div
          className={`${styles.dropdown} ${styles.neumophic} ${styles.input_box} ${styles.flex}`}
        >
          <select
            value={searchType}
            onChange={(event) => handleChange(event, "searchType")}
          >
            <option value="">Any</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          className={`${styles.submit_button} ${styles.flex} ${styles.neumophic}`}
          onClick={() => handleSubmit()}
        >
          <span>Search</span>
        </button>
      </div>
      {/* Cards will be shown here */}
      {loading ? (
        <div className={styles.flex}>
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <CardDisplay
          selectedMovie={(id) =>
            dispatch({ type: "SELECT_MOVIE", payload: { id, history } })
          }
          cardData={cardData}
        />
      )}
    </div>
  );
};

export default SearchSection;
