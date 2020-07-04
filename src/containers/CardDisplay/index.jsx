import React from "react";
import Pagination from "react-js-pagination";

import Card from "../../components/Card/Card";

import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";

const CardDisplay = (props) => {
  const totalItemsCount = useSelector((state) =>
    Number(state.SearchResults.itemCount)
  );
  const activePage = useSelector((state) => state.SearchResults.activePage);
  const dispatch = useDispatch();

  const handlePageChange = async (pageNumber) => {
    dispatch({ type: "SET_ACTIVE_PAGE", pageNumber });
    dispatch({
      type: "PAGINATION_TRIGGER",
      payload: {
        pageNumber,
        searchText: props.searchText,
        searchType: props.searchType,
      },
    });
  };

  return (
    <div className={styles.cards_holder}>
      {props.cardData.length
        ? props.cardData.map((card) => (
            <Card
              key={card.imdbID}
              selectedMovie={(id) => props.selectedMovie(id)}
              data={card}
            ></Card>
          ))
        : ""}
      {totalItemsCount > 10 ? (
        <div className={styles.pagination_holder}>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => handlePageChange(pageNumber)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardDisplay;
