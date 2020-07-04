import React, { useState } from "react";
import Pagination from "react-js-pagination";

import Card from "../../components/Card/Card";

import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";

const CardDisplay = (props) => {
  const [activePage, setActivePage] = useState(1);
  const totalItemsCount = useSelector((state) => state.SearchResults.itemCount);
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch({ type: "PAGINATION_TRIGGER", pageNumber });
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
